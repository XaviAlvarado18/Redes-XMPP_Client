import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-chat-main',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './chat-main.component.html',
  styleUrl: './chat-main.component.scss'
})
export class ChatMainComponent {
  sidebarItems = [
    { name: 'Area 1', icon: 'assets/area1-icon.png' },
    { name: 'Area 2', icon: 'assets/area2-icon.png' },
    // Agrega más áreas según sea necesario
  ];

  onItemClick(item: any) {
    // Manejar el clic en los elementos de la barra lateral
    console.log('Clicked on:', item.name);
  }
}
