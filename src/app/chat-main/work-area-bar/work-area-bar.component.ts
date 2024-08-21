import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageButtonComponent } from "../../image-button/image-button.component";
import { MessageItemComponent } from '../message-item/message-item.component';
import { MessageXMPP } from './message-xmpp.model';
import { AuthService } from '../../auth.service';
import { ModalNewChatsComponent } from './modal-new-chats/modal-new-chats.component';
import { Contact } from '../contact-area-bar/contact-xmpp.model';


interface MessageView {
  avatarUrl: string;
  contactName: string;
  lastMessage: string;
  timestamp: string;
}

@Component({
  selector: 'app-work-area-bar',
  standalone: true,
  imports: [CommonModule, ImageButtonComponent, MessageItemComponent, ModalNewChatsComponent],
  templateUrl: './work-area-bar.component.html',
  styleUrl: './work-area-bar.component.scss'
})
export class WorkAreaBarComponent implements OnInit{

  showModal = false;
  modalTitle = '';
  isGroupChat: boolean = false;
  

  messages: MessageXMPP[] = [];
  messagesView: MessageView[] = [];
  private refreshInterval: any;

  newMessageNotification: boolean = false;
  newMessageContent: string = '';
  dropdownOpen = false;


  @Output() messageSelected = new EventEmitter<any>();
  @Output() messagePerSender = new EventEmitter<any>();
  

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.getMessages() // Comenzar la actualización automática
  }

  startChat() {
    this.modalTitle = 'Selecciona un contacto para chat';
    this.isGroupChat = false;
    this.showModal = true;
  }

  startGroupChat() {
    this.modalTitle = 'Selecciona contactos para chat grupal';
    this.isGroupChat = true;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  onContactSelected(contact: Contact) {
    console.log('Contacto seleccionado:', contact.username);
    this.closeModal();
    // Aquí puedes añadir la lógica para iniciar el chat con el contacto seleccionado
  }
  
  handleChatStart(selectedContacts: Contact | Contact[]) {
    console.log("SelectedContacts on workarea: ", selectedContacts);
  
    // Asegúrate de que selectedContacts sea un array
    const contactsArray = Array.isArray(selectedContacts) ? selectedContacts : [selectedContacts];
  
    // Procesa los contactos para agregar nuevos chats a messagesView
    contactsArray.forEach(contact => {
      // Verifica si el chat ya existe en messagesView
      const chatExists = this.messagesView.some(message =>
        message.contactName === contact.username
      );
  
      if (!chatExists) {
        // Agrega un nuevo chat a messagesView
        this.messagesView.push({
          avatarUrl: 'assets/user.png', // Asegúrate de que `Contact` tenga un campo para avatarUrl
          contactName: contact.username,
          lastMessage: '', // Puede quedar vacío para nuevos chats
          timestamp: '' // Puede quedar vacío para nuevos chats
        });
      }
    });
  
    console.log("Updated messagesView: ", this.messagesView);
  }
  

  refreshContent(): void {
    console.log('Refreshing content...');
    this.refreshMessages(); // Llama a la función que obtiene los mensajes
  }
  
  showNotification(messageContent: string): void {
    this.newMessageContent = messageContent;
    this.newMessageNotification = true;
  
    setTimeout(() => {
      this.newMessageNotification = false;
    }, 5000); // La notificación desaparece después de 5 segundos
  }
  

  ngOnDestroy(): void {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval); // Limpiar el intervalo al destruir el componente
    }
  }

  handleClick() {
    console.log('Button clicked!');
  }


  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  closeDropdown() {
    this.dropdownOpen = false;
  }


  // Método para manejar el clic en un mensaje
  handleMessageClick(message: any) {
    this.messageSelected.emit([message]);  // Emitir el mensaje seleccionado
    this.messagePerSender.emit(message)
    console.log("Message selected", message);
  }

  getMessages(): void {
    this.authService.getMessages().subscribe(
      (response: { messages: MessageXMPP[] }) => {
        console.log(response); // Verifica la estructura de la respuesta
        this.processMessages(response.messages);
      },
      (error) => {
        console.error('Error al obtener los mensajes:', error);
      }
    );
  }

  private refreshMessages(): void {
    this.authService.getMessages().subscribe(
      (response: { messages: MessageXMPP[] }) => {
        console.log(response); // Verifica la estructura de la respuesta
        this.processMessages(response.messages);
      },
      (error) => {
        console.error('Error al obtener los mensajes:', error);
      }
    );
  }
  
  private startAutoRefresh(): void {
    this.refreshInterval = setInterval(() => {
      this.refreshMessages(); // Llama al método para actualizar los mensajes
    }, 100000); // Actualizar cada 5 segundos
  }

  processMessages(messages: MessageXMPP[]): void {
    const previousMessageCount = this.messages.length;
    const groupedMessages: { [sender: string]: MessageXMPP[] } = {};

    messages.forEach(message => {
      if (!groupedMessages[message.sender]) {
        groupedMessages[message.sender] = [];
      }
      groupedMessages[message.sender].push(message);
    });

    // Almacena todos los mensajes
    this.messages = messages;

    // Obtener el nombre de usuario y filtrar los mensajes
    this.authService.getUsername().subscribe(username => {
      if (!username) {
        console.error('Username not found');
        return;
      }
      //console.log("xd: ", username);

      // Filtrar los mensajes por recipient
      this.messagesView = Object.keys(groupedMessages).map(sender => {
        const senderMessages = groupedMessages[sender];
        const lastMessage = senderMessages[senderMessages.length - 1];

        // Solo incluir mensajes donde el recipient es igual al nombre de usuario
        if (lastMessage.recipient === username+'@alumchat.lol') {
          return {
            avatarUrl: 'assets/user.png', // Aquí puedes personalizar el avatar si es necesario
            contactName: lastMessage.sender,
            lastMessage: lastMessage.text,
            timestamp: lastMessage.date_msg
          };
        }

        // Retornar null para mensajes que no cumplen la condición
        return null;
      }).filter(item => item !== null); // Filtrar los nulos resultantes

      console.log("Messages Array: ", this.messages);
      console.log("Array: ", this.messagesView); // Verifica el resultado procesado

      // Mostrar notificación si hay un nuevo mensaje
    if (this.messages.length > previousMessageCount) {
      const newMessages = this.messages.slice(previousMessageCount);
      const newMessageText = newMessages.map(m => m.text).join('\n');
      this.showNotification(`Nuevo mensaje: ${newMessageText}`);
    }

    });
  }

}
