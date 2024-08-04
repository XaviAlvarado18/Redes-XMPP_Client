import { Component } from '@angular/core';
import { ImageButtonComponent } from '../../image-button/image-button.component';
import { MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { ModalComponentComponent } from '../modal-component/modal-component.component';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-lateral-bar',
  standalone: true,
  imports: [ImageButtonComponent],
  templateUrl: './lateral-bar.component.html',
  styleUrl: './lateral-bar.component.scss'
})
export class LateralBarComponent {

  constructor(private dialog: MatDialog, private authService: AuthService) {}

  onItemClick(item: any) {
    // Manejar el clic en los elementos de la barra lateral
    console.log('Clicked on:', item.name);
  }

  handleClick() {
    console.log('Button clicked!');
  }

  openModal() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;  // Para que el modal no se cierre al hacer clic fuera
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80vw';  // Ajusta el ancho del modal aquí
    dialogConfig.maxWidth = '80vw';  // Asegúrate de que el modal no sea más ancho que el 80% de la ventana
    dialogConfig.maxHeight = '90vh';

    this.dialog.open(ModalComponentComponent, dialogConfig);
  }


  closeSession() {
    const username = 'usuario';
    this.authService.disconnect(username).subscribe(response => {
      if (response.status === 'disconnected') {
        console.log('Session disconnected successfully');
      } else {
        console.log('Failed to disconnect session:', response.status);
      }
    });
  }

}
