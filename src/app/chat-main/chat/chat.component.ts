import { Component, OnInit } from '@angular/core';
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
  messages: { sender: string, text: string }[] = [];
  newMessage: string = '';

  constructor() { }

  ngOnInit(): void {
    "// Aquí puedes cargar los mensajes iniciales si es necesario"
  }

  sendMessage(): void {
    if (this.newMessage.trim()) {
      this.messages.push({
        sender: this.username,
        text: this.newMessage
      });
      this.newMessage = ''; // Limpiar el campo de texto después de enviar
    }
  }
}