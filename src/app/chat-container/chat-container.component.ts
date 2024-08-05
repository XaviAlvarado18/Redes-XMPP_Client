import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-chat-container',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './chat-container.component.html',
  styleUrls: ['./chat-container.component.scss']
})
export class ChatContainerComponent {
  chats = [
    {
      title: 'Nota para mi',
      preview: 'Hola chaval',
      messages: [
        { user: 'Yo', time: '20:22', text: 'Hola chaval', date: 'jue. 1/08/2024' }
      ]
    },
    {
      title: 'alumchat.lol',
      preview: 'Hola',
      messages: [
        { user: 'Yo', time: '14:55', text: 'Hola', date: 'jue. 25/07/2024' }
      ]
    }
  ];
  selectedChat = this.chats[0];
  newMessage = '';

  sendMessage() {
    if (this.newMessage.trim()) {
      this.selectedChat.messages.push({
        user: 'Yo',
        time: new Date().toLocaleTimeString(),
        text: this.newMessage,
        date: new Date().toLocaleDateString()
      });
      this.newMessage = '';
    }
  }
}
