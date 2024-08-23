import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../auth.service';
import { Contact } from '../../contact-area-bar/contact-xmpp.model';
import { ContactButtonComponent } from '../../contact-area-bar/contact-button/contact-button.component';
import { FormsModule } from '@angular/forms';
import { GroupRequest } from '../GroupRequest.model';

@Component({
  selector: 'app-modal-new-chats',
  standalone: true,
  imports: [CommonModule, ContactButtonComponent, FormsModule],
  templateUrl: './modal-new-chats.component.html',
  styleUrl: './modal-new-chats.component.scss'
})
export class ModalNewChatsComponent {
  @Input() modalTitle: string = 'Selecciona un contacto';
  @Input() isGroupChat: boolean = false; // Flag para chat grupal
  @Output() close = new EventEmitter<void>();
  @Output() chatStart = new EventEmitter<Contact | Contact[]>(); // Emitirá un contacto o un array de contactos
  groupName: string = ''; // Para el nombre del grupo en chats grupales


  contacts: Contact[] = [];
  selectedContacts: Contact[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  get isGroupNameValid(): boolean {
    return this.groupName.trim().length > 0;
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
      if (this.isGroupNameValid) {
        const groupRequest: GroupRequest = {
          groupName: this.groupName,
          members: this.selectedContacts.map(contact => contact.username)
        };

        this.authService.createGroup(groupRequest).subscribe(
          response => {
            console.log('Grupo creado con éxito:', response);
            // No emitimos el evento `chatStart` para chat grupal
            this.closeModal();
          },
          error => {
            console.error('Error al crear el grupo:', error);
          }
        );
      } else {
        console.log('Invalid group name.');
      }
    } else if (!this.isGroupChat && this.selectedContacts.length === 1) {
      console.log('Emitting individual chat:', this.selectedContacts[0]);
      this.chatStart.emit(this.selectedContacts[0]); // Emitimos el evento solo para chat individual
      this.closeModal();
    } else {
      console.log('Cannot start chat. Invalid selection.');
    }
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
