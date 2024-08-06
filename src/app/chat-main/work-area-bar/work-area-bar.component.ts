import { Component } from '@angular/core';
import { ImageButtonComponent } from "../../image-button/image-button.component";
import { MessageItemComponent } from '../message-item/message-item.component';

@Component({
  selector: 'app-work-area-bar',
  standalone: true,
  imports: [ImageButtonComponent, MessageItemComponent],
  templateUrl: './work-area-bar.component.html',
  styleUrl: './work-area-bar.component.scss'
})
export class WorkAreaBarComponent {

  handleClick() {
    console.log('Button clicked!');
  }

}
