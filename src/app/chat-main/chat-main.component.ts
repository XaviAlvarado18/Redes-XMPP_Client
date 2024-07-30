import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LateralBarComponent } from '../lateral-bar/lateral-bar.component';


@Component({
  selector: 'app-chat-main',
  standalone: true,
  imports: [RouterOutlet, CommonModule, LateralBarComponent],
  templateUrl: './chat-main.component.html',
  styleUrl: './chat-main.component.scss'
})
export class ChatMainComponent {

  
}
