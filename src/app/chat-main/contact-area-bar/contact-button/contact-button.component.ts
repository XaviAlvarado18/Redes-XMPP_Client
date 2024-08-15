import { Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-contact-button',
  standalone: true,
  templateUrl: './contact-button.component.html',
  styleUrls: ['./contact-button.component.scss']
})

export class ContactButtonComponent {
  @Input() username: string = '';
  @Input() status: string = '';
  @Output() contactClick = new EventEmitter<string>();

  handleClick(): void {
    this.contactClick.emit(this.username);
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
