import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../auth.service';

@Component({
  selector: 'app-add-contact-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-contact-modal.component.html',
  styleUrl: './add-contact-modal.component.scss'
})
export class AddContactModalComponent {
  isVisible: boolean = false;
  contactName: string = '';

  @Output() contactAdded = new EventEmitter<string>();
  constructor(private authService: AuthService) {}

  openModal() {
    this.isVisible = true;
  }

  closeModal() {
    this.isVisible = false;
  }

  addContact() {
    if (this.contactName.trim()) {
      this.authService.addContact(this.contactName).subscribe(
        response => {
          console.log('Contacto añadido:', response);
          this.contactAdded.emit(this.contactName);
          this.closeModal();
        },
        error => {
          console.error('Error al añadir contacto:', error);
          // Manejo de errores adecuado aquí
        }
      );
    }
  }
}