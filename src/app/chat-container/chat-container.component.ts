import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-container',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './chat-container.component.html',
  styleUrl: './chat-container.component.scss'
})
export class ChatContainerComponent {
  messages = [
    { user: 'Yo', time: '20:22', text: 'Hola chaval', date: 'jue. 1/08/2024' }
  ];
  newMessage = '';

  sendMessage() {
    if (this.newMessage.trim()) {
      this.messages.push({
        user: 'Yo',
        time: new Date().toLocaleTimeString(),
        text: this.newMessage,
        date: new Date().toLocaleDateString()
      });
      this.newMessage = '';
    }
  }
}
