import { Component, Input} from '@angular/core';
import { LateralBarComponent } from '../lateral-bar/lateral-bar.component';
import { ContactAreaBarComponent } from '../contact-area-bar/contact-area-bar.component';
import { ContactviewComponent } from './contactview/contactview.component';
import { Contact } from '../contact-area-bar/contact-xmpp.model';

@Component({
  selector: 'app-view-contactarea',
  standalone: true,
  imports: [LateralBarComponent, ContactAreaBarComponent, ContactviewComponent],
  templateUrl: './view-contactarea.component.html',
  styleUrl: './view-contactarea.component.scss'
})
export class ViewContactareaComponent {

  @Input() contactAreaBarPosition: number = 0.1;
  selectedContact: Contact | null = null;

  handleContactSelected(contact: Contact): void {
    this.selectedContact = contact;
  }

}
