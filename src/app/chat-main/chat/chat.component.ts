import { Component, OnInit, Input} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageBubbleComponent } from './message-bubble/message-bubble.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth.service';
import { ImageButtonComponent } from '../../image-button/image-button.component';
import { forkJoin } from 'rxjs';


interface Message {
  sender: string;
  text: string;
  date_msg: string;
  recipient: string;
}




@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, MessageBubbleComponent, CommonModule, ImageButtonComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})

export class ChatComponent implements OnInit {
  username: string = 'Usuario'; // Cambia esto según tu lógica
  newMessage: string = '';
  recipient: string = '';
  @Input() contactName: string = '';
  @Input() messages: Message[] = [];
  @Input() messagesView: Message[] = [];
  @Input() group: any;
  flattenedMessages: any[] = [];
  messagesPerSender: Message[] = [];
  private refreshInterval: any;
  isGroup: Boolean | undefined;
  groupName: any;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    console.log("Messages [CHAT]: ", this.messages);
    console.log("GROUP: ", this.group);
  

    // Verificar si hay al menos un mensaje nulo
    const hasAnyNullMessage = this.messages && this.messages.some(message => message.text === null);
  
    if (hasAnyNullMessage) {
      console.log("Se detectó un mensaje nulo, procesando como chat grupal.");
      // Filtrar los mensajes que tengan 'text' no nulo
      this.messagesPerSender = this.messages.filter(message => message.text !== null).map(message => ({
        ...message,
        date_msg: "" // Dejar 'date_msg' como vacío si hay mensajes nulos
      }));

      this.isGroup = true;

      // Obtener el nombre de usuario
      this.authService.getUsername().subscribe(username => {
        this.username = username || 'Username';
      });

    console.log(this.messagesPerSender);
    } else {
        // Si los mensajes están anidados, aplanar el array
        if (this.messages.length > 0 && Array.isArray(this.messages[0])) {
          this.flattenedMessages = this.messages.flat();
        } else {
          this.flattenedMessages = this.messages;
        }
    
        // Procesar las fechas de los mensajes
        this.flattenedMessages = this.flattenedMessages.map(message => {
          try {
            const [day, month] = message.timestamp.split('/');
            const currentYear = new Date().getFullYear();
            const date = new Date(currentYear, parseInt(month) - 1, parseInt(day));
            
            return {
              ...message,
              date_msg: date // Guardar como objeto Date
            };
          } catch (error) {
            console.error('Error al formatear la fecha del mensaje:', error);
            return {
              ...message,
              date_msg: null // Dejar la fecha como null si ocurre un error
            };
          }
        });
    
        // Obtener el nombre de contacto
        if (this.flattenedMessages.length > 0) {
          this.contactName = this.flattenedMessages[0].contactName || 'Unknown';
        } else {
          this.contactName = 'Unknown';
        }
      
    
      // Obtener el nombre de usuario
      this.authService.getUsername().subscribe(username => {
        this.username = username || 'Username';
      });
    
      // Suscribirse a la selección de mensajes
      this.authService.messageSelected$.subscribe(contactName => {
        this.contactName = contactName;
        this.loadMessagesForContact(contactName);
      });
    
      console.log("flattenedMessages: ", this.flattenedMessages[0]);
    
      // Obtener mensajes por remitente
      this.authService.getMessagesBySender(this.contactName).subscribe(response => {
        // Asignar todos los mensajes directamente a 'messagesPerSender'
        this.messagesPerSender = response.messages;
    
        // Ordenar los mensajes por fecha, con los más antiguos al principio y los más recientes al final
        this.messagesPerSender.sort((a, b) => {
          const parseDate = (dateString: string) => {
            const [datePart, timePart] = dateString.split(' ');
            const [day, month] = datePart.split('/').map(Number);
            const [hours, minutes] = timePart.split(':').map(Number);
            return new Date(new Date().getFullYear(), month - 1, day, hours, minutes);
          };
    
          return parseDate(a.date_msg).getTime() - parseDate(b.date_msg).getTime();
        });
    
        // Asignar el 'recipient' del primer mensaje a 'this.recipient'
        if (this.messagesPerSender.length > 0) {
          this.recipient = this.messagesPerSender[0].recipient;
        }
    
        console.log('Messages Per Sender:', this.messagesPerSender);
        console.log('Recipient:', this.recipient);
        //this.isGroup = false;
      });
    }
  }
  

  handleclick = () =>{
    console.log("Adjunt");
  }

  refreshContent = () => {
    forkJoin({
      individualMessages: this.authService.getMessages(),
      groupMessages: this.authService.getGetMessagesGroup()
    }).subscribe(
      ({ individualMessages, groupMessages }) => {
        if (this.group === undefined) {
          // Procesar solo mensajes individuales
          if (individualMessages.messages) {
            this.messagesPerSender = individualMessages.messages.map(message => ({
              ...message,
              date_msg: "" // Dejar 'date_msg' como vacío si hay mensajes nulos
            }));
          } else {
            this.messagesPerSender = individualMessages.messages; // No se necesita filtrar ni mapear
          }
        } else {
          // Procesar solo mensajes grupales
          this.messagesPerSender = groupMessages.filter(message => message.text !== null).map(message => ({
            ...message,
            date_msg: "" // Dejar 'date_msg' como vacío si hay mensajes nulos
          }));
        }
  
        console.log("GROUP: ", this.group);
      },
      (error) => {
        console.error('Error al obtener los mensajes:', error);
      }
    );
  }
  

  loadMessagesForContact(contactName: string): void {
    this.authService.getMessages().subscribe(response => {
      const messages = response.messages;
      this.flattenedMessages = messages.filter(
        message => message.sender === contactName || message.sender === this.username
      );
    });
  }

  loadMessagesForSender(contactName: string): void {
    this.authService.getMessagesBySender(contactName).subscribe(response => {
        const messages = response.messages;

        // Filtrar los mensajes por el remitente
        this.flattenedMessages = messages.filter(
            (message: { sender: string; }) => message.sender === contactName || message.sender === this.username
        );

        // Ordenar los mensajes por fecha, con los más antiguos al principio y los más recientes al final
        this.flattenedMessages.sort((a, b) => new Date(a.date_msg).getTime() - new Date(b.date_msg).getTime());
    });
}

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${month}/${day} ${hours}:${minutes}`;
  }

  sendMessageAnswer(): void {
    if (this.isGroup) {
      this.sendMessageGroup();
    } else {
      this.sendMessage();
    }
  }

  sendMessageGroup(): void {
    if (this.newMessage.trim() === '') {
      return;
    }
  
    const groupName = this.group.groupName;
    console.log("groupName: ", groupName);
    console.log("this.message: ", this.newMessage);
  
    this.authService.sendGroupMessage(groupName, this.newMessage).subscribe(
      response => {
        console.log('Response from backend:', response);
  
        // Manejar la respuesta del backend
        if (response.status === 'group message sent') {
          console.log('Mensaje grupal enviado exitosamente.');
  
          // Crear un nuevo objeto de mensaje grupal
          const newMessage: Message = {
            sender: this.username,
            text: this.newMessage,
            date_msg: this.formatDate(new Date().toISOString()),
            recipient: groupName, // Asignar el nombre del grupo como destinatario
          };
  
          // Agregar el mensaje a las listas de mensajes para renderizarlo en el chat
          this.flattenedMessages.push(newMessage);
          this.messagesPerSender.push(newMessage);
  
          // Limpiar el cuerpo del mensaje
          this.newMessage = '';
        } else {
          console.error('Error al enviar mensaje grupal:', response.error);
        }
      },
      error => {
        console.error('Error al enviar mensaje grupal:', error);
      }
    );
  }
  
  
  sendMessage() {
    if (this.newMessage.trim() === '') {
      return;
    }

    this.authService.sendMessage(this.contactName, this.newMessage).subscribe(response => {
      if (response.status === 'message sent') {
        const newMessage: Message = {
          sender: this.username,
          text: this.newMessage,
          date_msg: this.formatDate(new Date().toISOString()),
          recipient: this.recipient,
        };
        this.flattenedMessages.push(newMessage);
        this.messagesPerSender.push(newMessage);
        this.newMessage = '';
      } else {
        console.error('Failed to send message', response.error);
      }
    }, error => {
      console.error('An error occurred:', error);
    });
  }
}