import { Component, Input} from '@angular/core';
import { Contact } from '../../contact-area-bar/contact-xmpp.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contactview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contactview.component.html',
  styleUrl: './contactview.component.scss'
})
export class ContactviewComponent {
  @Input() contact: Contact | null = null;

  getInitial(username: string): string {
    return username.charAt(0).toUpperCase();
  }
}
