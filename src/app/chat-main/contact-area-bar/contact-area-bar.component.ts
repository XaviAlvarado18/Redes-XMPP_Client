import { Component, EventEmitter, Output, ViewChild} from '@angular/core';
import { AuthService } from '../../auth.service';
import { Contact } from './contact-xmpp.model';
import { CommonModule } from '@angular/common';
import { ContactButtonComponent } from './contact-button/contact-button.component';
import { ImageButtonComponent } from '../../image-button/image-button.component';
import { AddContactModalComponent } from './add-contact-modal/add-contact-modal.component';

@Component({
  selector: 'app-contact-area-bar',
  standalone: true,
  imports: [CommonModule, ContactButtonComponent, ImageButtonComponent, AddContactModalComponent],
  templateUrl: './contact-area-bar.component.html',
  styleUrl: './contact-area-bar.component.scss'
})
export class ContactAreaBarComponent {
  contacts: Contact[] = [];
  private previousContactCount: number = 0;

  newContactNotification: boolean = false;
  newContactName: string = '';

  @Output() contactSelected = new EventEmitter<Contact>();
  @ViewChild(AddContactModalComponent) addContactModal!: AddContactModalComponent;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  handleClick() {
    this.addContactModal.openModal();
  }

  onContactAdded(contactName: string) {
    // Lógica para añadir el contacto
    console.log('Contacto añadido:', contactName);
  }

  onContactClick(contact: Contact): void {
    console.log('Clicked contact:', contact.username);
  
    const selectedContact = this.findContactByUsername(contact.username);
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
        const newContacts = data.contacts;
        console.log(newContacts);
        this.checkForNewContacts(newContacts);
        this.contacts = newContacts;
      },
      error => {
        console.error('Error loading contacts', error);
      }
    );
  }

  showNotification(contactName: string): void {
    this.newContactName = contactName;
    this.newContactNotification = true;

    setTimeout(() => {
      this.newContactNotification = false;
    }, 5000); // La notificación desaparece después de 5 segundos
  }

  checkForNewContacts(newContacts: Contact[]): void {
    if (newContacts.length > this.previousContactCount) {
      const newContact = newContacts.slice(this.previousContactCount).pop(); // Obtiene el último contacto añadido
      if (newContact) {
        this.showNotification(`Nuevo contacto: ${newContact.username}`);
      }
    }
    this.previousContactCount = newContacts.length;
  }

}
