import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LateralBarComponent } from '../lateral-bar/lateral-bar.component';
import { ChatContainerComponent } from '../chat-container/chat-container.component';


@Component({
  selector: 'app-chat-main',
  standalone: true,
  imports: [RouterOutlet, CommonModule, LateralBarComponent, ChatContainerComponent],
  templateUrl: './chat-main.component.html',
  styleUrl: './chat-main.component.scss'
})
export class ChatMainComponent {

  
}
