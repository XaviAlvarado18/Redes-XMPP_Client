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
  private refreshInterval: any;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    if (this.messages.length > 0 && Array.isArray(this.messages[0])) {
      this.flattenedMessages = this.messages.flat();
    } else {
      this.flattenedMessages = this.messages;
    }

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
      this.username = username || 'Username';
    });

    this.authService.messageSelected$.subscribe(contactName => {
      this.contactName = contactName;
      this.loadMessagesForContact(contactName);
    });

    console.log("flattenedMessages: ", this.flattenedMessages[0]);


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