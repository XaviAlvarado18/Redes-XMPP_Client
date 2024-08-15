import { Component, EventEmitter, Output} from '@angular/core';
import { AuthService } from '../../auth.service';
import { Contact } from './contact-xmpp.model';
import { CommonModule } from '@angular/common';
import { ContactButtonComponent } from './contact-button/contact-button.component';

@Component({
  selector: 'app-contact-area-bar',
  standalone: true,
  imports: [CommonModule, ContactButtonComponent],
  templateUrl: './contact-area-bar.component.html',
  styleUrl: './contact-area-bar.component.scss'
})
export class ContactAreaBarComponent {
  contacts: Contact[] = [];
  @Output() contactSelected = new EventEmitter<Contact>();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  onContactClick(username: string): void {
    //console.log('Clicked contact:', username);
  
    const selectedContact = this.findContactByUsername(username);
    if (selectedContact) {
      console.log('Selected contact:', selectedContact);
      this.contactSelected.emit(selectedContact);
    } else {
      console.log('Contact not found');
    }
  }
  
  findContactByUsername(username: string): Contact | undefined {
    return this.contacts.find(contact => contact.username === username);
  }
  
  loadContacts(): void {
    this.authService.getContacts().subscribe(
      data => {
        this.contacts = data.contacts;
        console.log(this.contacts);
      },
      error => {
        console.error('Error loading contacts', error);
      }
    );
  }
}
