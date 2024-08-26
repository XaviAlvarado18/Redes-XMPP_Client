import { Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-message-item',
  standalone: true,
  imports: [],
  templateUrl: './message-item.component.html',
  styleUrl: './message-item.component.scss'
})
export class MessageItemComponent {
  @Input() avatarUrl: string = 'assets/user.png'; // URL predeterminada
  @Input() contactName: string = '';
  @Input() lastMessage: string = '';
  @Input() timestamp: string = '';
  @Input() message: any;

  @Output() messageClick = new EventEmitter<void>();

  onMessageClick() {
    this.messageClick.emit(this.message);
  }

}
