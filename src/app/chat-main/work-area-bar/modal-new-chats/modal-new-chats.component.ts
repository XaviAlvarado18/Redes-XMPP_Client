import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../auth.service';
import { Contact } from '../../contact-area-bar/contact-xmpp.model';
import { ContactButtonComponent } from '../../contact-area-bar/contact-button/contact-button.component';

@Component({
  selector: 'app-modal-new-chats',
  standalone: true,
  imports: [CommonModule, ContactButtonComponent],
  templateUrl: './modal-new-chats.component.html',
  styleUrl: './modal-new-chats.component.scss'
})
export class ModalNewChatsComponent {
  @Input() modalTitle: string = 'Selecciona un contacto';
  @Input() isGroupChat: boolean = false; // Flag para chat grupal
  @Output() close = new EventEmitter<void>();
  @Output() chatStart = new EventEmitter<Contact | Contact[]>(); // Emitirá un contacto o un array de contactos

  contacts: Contact[] = [];
  selectedContacts: Contact[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  closeModal() {
    this.close.emit();
  }

  toggleContactSelection(contact: Contact) {
    console.log('Toggling contact:', contact);
  
    console.log('this.isGroup', this.isGroupChat);
    if (this.isGroupChat) {
      const index = this.selectedContacts.findIndex(c => c.username === contact.username);
      if (index >= 0) {
        console.log('Deselecting contact:', contact);
        this.selectedContacts.splice(index, 1);
      } else {
        console.log('Selecting contact:', contact);
        this.selectedContacts.push(contact);
      }
    } else {
      this.selectedContacts = [contact];
    }
    
    console.log('Current selected contacts:', this.selectedContacts);
  }
  

  startChat() {
    console.log('Starting chat. Group chat:', this.isGroupChat);
    console.log('Selected contacts:', this.selectedContacts);
  
    if (this.isGroupChat && this.selectedContacts.length >= 2) {
      console.log('Emitting group chat:', this.selectedContacts);
      this.chatStart.emit(this.selectedContacts);
    } else if (!this.isGroupChat && this.selectedContacts.length === 1) {
      console.log('Emitting individual chat:', this.selectedContacts[0]);
      this.chatStart.emit(this.selectedContacts[0]);
    } else {
      console.log('Cannot start chat. Invalid selection.');
    }
    
    this.closeModal();
  }
  

  loadContacts(): void {
    this.authService.getContacts().subscribe(
      data => {
        this.contacts = data.contacts;
      },
      error => {
        console.error('Error loading contacts', error);
      }
    );
  }

  isContactSelected(contact: Contact): boolean {
    const isSelected = this.selectedContacts.some(c => c.username === contact.username);
    //console.log(`Is contact ${contact.username} selected? ${isSelected}`);
    return isSelected;
  }
  
}
