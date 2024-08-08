import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageButtonComponent } from "../../image-button/image-button.component";
import { MessageItemComponent } from '../message-item/message-item.component';
import { MessageXMPP } from './message-xmpp.model';
import { AuthService } from '../../auth.service';


interface MessageView {
  avatarUrl: string;
  contactName: string;
  lastMessage: string;
  timestamp: string;
}

@Component({
  selector: 'app-work-area-bar',
  standalone: true,
  imports: [CommonModule, ImageButtonComponent, MessageItemComponent],
  templateUrl: './work-area-bar.component.html',
  styleUrl: './work-area-bar.component.scss'
})
export class WorkAreaBarComponent implements OnInit{

  messages: MessageXMPP[] = [];
  messagesView: MessageView[] = [];

  @Output() messageSelected = new EventEmitter<any>();
  

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.getMessages();
  }

  handleClick() {
    console.log('Button clicked!');
  }

  // Método para manejar el clic en un mensaje
  handleMessageClick(message: any) {
    this.messageSelected.emit([this.messagesView]);  // Emitir el mensaje seleccionado
    console.log("Message selected", this.messagesView);
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
  
  

  processMessages(messages: MessageXMPP[]): void {
    const groupedMessages: { [sender: string]: MessageXMPP[] } = {};

    messages.forEach(message => {
      if (!groupedMessages[message.sender]) {
        groupedMessages[message.sender] = [];
      }
      groupedMessages[message.sender].push(message);
    });

    this.messagesView = Object.keys(groupedMessages).map(sender => {
      const senderMessages = groupedMessages[sender];
      const lastMessage = senderMessages[senderMessages.length - 1];
      return {
        avatarUrl: 'assets/user.png', // Aquí puedes personalizar el avatar si es necesario
        contactName: lastMessage.sender,
        lastMessage: lastMessage.text,
        timestamp: lastMessage.date_msg
      };
    });

    console.log("Array: ", this.messagesView); // Verifica el resultado procesado
  }

}
