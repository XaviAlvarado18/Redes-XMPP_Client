import { Component, Input} from '@angular/core';
import { LateralBarComponent } from '../lateral-bar/lateral-bar.component';
import { ContactAreaBarComponent } from '../contact-area-bar/contact-area-bar.component';

@Component({
  selector: 'app-view-contactarea',
  standalone: true,
  imports: [LateralBarComponent, ContactAreaBarComponent],
  templateUrl: './view-contactarea.component.html',
  styleUrl: './view-contactarea.component.scss'
})
export class ViewContactareaComponent {

  @Input() contactAreaBarPosition: number = 0.1;

  handleContactSelected(event: any) {
    // Aquí puedes manejar la lógica cuando se selecciona un contacto
    console.log('Contacto seleccionado:', event);
    // Implementa la lógica necesaria, por ejemplo:
    // - Actualizar el estado del componente
    // - Emitir un evento al componente padre
    // - Realizar alguna acción con el contacto seleccionado
  }

}
