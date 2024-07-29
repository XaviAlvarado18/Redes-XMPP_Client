import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ImageButtonComponent } from '../image-button/image-button.component';


@Component({
  selector: 'app-chat-main',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ImageButtonComponent],
  templateUrl: './chat-main.component.html',
  styleUrl: './chat-main.component.scss'
})
export class ChatMainComponent {

  pathToImage: string = 'assets/no_avatar.svg';


  onItemClick(item: any) {
    // Manejar el clic en los elementos de la barra lateral
    console.log('Clicked on:', item.name);
  }

  handleClick() {
    console.log('Button clicked!');
  }
}
