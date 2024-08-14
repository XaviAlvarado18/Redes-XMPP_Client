import { Component, OnInit, Input} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageBubbleComponent } from './message-bubble/message-bubble.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth.service';

interface Message {
  sender: string;
  text: string;
  date_msg: string;
  recipient: string;
}




@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, MessageBubbleComponent, CommonModule],
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
  flattenedMessages: any[] = [];
  messagesPerSender: Message[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    if (this.messages.length > 0 && Array.isArray(this.messages[0])) {
      this.flattenedMessages = this.messages.flat();
    } else {
      this.flattenedMessages = this.messages;
    }

    //console.log("flattenedMessages Recipient: ", this.flattenedMessages[0].recipient);

    
    
    if (this.flattenedMessages.length > 0) {
      this.contactName = this.flattenedMessages[0].contactName || 'Unknown';
    } else {
      this.contactName = 'Unknown';
    }

    // Formatear la fecha de los mensajes a un objeto Date
    this.flattenedMessages = this.flattenedMessages.map(message => {
      const [day, month] = message.timestamp.split('/');
      const currentYear = new Date().getFullYear();
      const date = new Date(currentYear, parseInt(month) - 1, parseInt(day));
      return {
        ...message,
        date_msg: date // Guardar como objeto Date
      };
    });

    this.authService.getUsername().subscribe(username => {
      // Establecer un valor predeterminado si username es null
      this.username = username || 'Username';
    });    

    this.authService.messageSelected$.subscribe(contactName => {
      this.contactName = contactName;
      this.loadMessagesForContact(contactName);
    });

    console.log("flattenedMessages: ", this.flattenedMessages[0]);
    // Cargar mensajes por remitente en el OnInit
    this.authService.getMessagesBySender(this.contactName).subscribe(response => {
      // Asignar todos los mensajes directamente a 'messagesPerSender' sin filtrado
      this.messagesPerSender = response.messages;
    
      // Asignar el 'recipient' del primer mensaje a 'this.recipient'
      if (this.messagesPerSender.length > 0) {
        this.recipient = this.messagesPerSender[0].recipient;
      }
    
      console.log('Messages Per Sender:', this.messagesPerSender); 
      console.log('Recipient:', this.recipient); 
    });
    
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
      this.flattenedMessages = messages.filter(
        (        message: { sender: string; }) => message.sender === contactName || message.sender === this.username
      );
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${month}/${day}`;
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