import { Component, OnInit, Input} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})

export class ChatComponent implements OnInit {
  username: string = 'Usuario'; // Cambia esto según tu lógica
  //messages: { sender: string, text: string }[] = [];
  newMessage: string = '';
  //@Input() messages: any[] = [];
  contactName: string = '';
  @Input() messages: { avatarUrl: string; contactName: string; lastMessage: string; timestamp: string }[] = [];

  constructor() { }

  ngOnInit(): void {
    // Verifica los mensajes en la consola
    console.log("Messages in chat: ", this.messages);

    // Verifica el formato y extrae el nombre del contacto del primer mensaje si existe
    if (this.messages.length > 0 && Array.isArray(this.messages[0]) && this.messages[0].length > 0) {
      const firstMessage = this.messages[0][0]; // Primer mensaje en el primer array
      this.contactName = firstMessage.contactName || 'Unknown';
    } else {
      this.contactName = 'Unknown';
    }

    console.log("Contact Name: ", this.contactName);
  }

  /*
  sendMessage(): void {
    if (this.newMessage.trim()) {
      this.messages.push({
        //sender: this.contactName,
        text: this.newMessage
      });
      this.newMessage = ''; // Limpiar el campo de texto después de enviar
    }
  }
  */
}