import { Component, EventEmitter, Input, Output} from '@angular/core';
import { Contact } from '../contact-xmpp.model';

@Component({
  selector: 'app-contact-button',
  standalone: true,
  templateUrl: './contact-button.component.html',
  styleUrls: ['./contact-button.component.scss']
})

export class ContactButtonComponent {
  
  @Input() username: string = '';
  @Input() status: string = '';
  @Input() contact?: Contact; // Agrega el contacto como input
  @Input() selected: boolean = false; 
  @Output() contactClick = new EventEmitter<Contact>();

  handleClick() {
    if (this.contact) {
      this.contactClick.emit(this.contact); // Emitir el objeto Contact
    }
  }


  get initial(): string {
    return this.username ? this.username.charAt(0).toUpperCase() : '';
  }

  getAvatarColor(): string {
    // Puedes personalizar los colores según el estado
    switch (this.status.toLowerCase()) {
      case 'disponible':
        return '#28a745'; // Verde
      case 'busy':
        return '#dc3545'; // Rojo
      case 'desconectado':
        return '#6c757d'; // Gris
      default:
        return '#007bff'; // Azul por defecto
    }
  }
}
