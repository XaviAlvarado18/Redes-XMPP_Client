import { Component, Injectable } from '@angular/core';
import { ImageButtonComponent } from '../../image-button/image-button.component';
import { MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { ModalComponentComponent } from '../modal-component/modal-component.component';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lateral-bar',
  standalone: true,
  imports: [ImageButtonComponent],
  templateUrl: './lateral-bar.component.html',
  styleUrl: './lateral-bar.component.scss'
})

@Injectable({providedIn: 'root'})
export class LateralBarComponent {

  username: string | null = null;
  private readonly domain = '@alumchat.lol';

  constructor(private dialog: MatDialog, private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.getUsername().subscribe(username => {
      console.log('Username from service:', username); // Debugging
      this.username = username;
    });
  }

  onItemClick(item: any) {
    // Manejar el clic en los elementos de la barra lateral
    console.log('Clicked on:', item.name);
  }

  handleClick() {
    console.log('Button clicked!');
  }

  to_chatMain(): void{
    this.router.navigate(['/chat-main']);
  }

  to_workArea(): void {
    this.router.navigate(['/workarea']); // Navega a la nueva pantalla
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
    console.log('closeSession called');
    this.authService.getUsername().subscribe(username => {
      console.log('Username from service in closeSession:', username); // Debugging
      if (username) {
        const fullUsername = `${username}${this.domain}`; // Append domain
        this.authService.disconnect(fullUsername).subscribe(response => {
          if (response.status === 'disconnected') {
            console.log('Session disconnected successfully');
            this.router.navigate(['/login']); // Redirigir a la pantalla de login
          } else {
            console.log('Failed to disconnect session:', response.status);
          }
        });
      } else {
        console.log('No username available for disconnection');
      }
    });
  }

  deleteUser() {
    this.authService.getUsername().subscribe(username => {
        if (username) {
            const fullUsername = `${username}${this.domain}`; // Append domain
            this.authService.deleteUser(fullUsername).subscribe(response => {
                if (response.status === 'user_deleted') {
                    console.log('User deleted successfully');
                    this.router.navigate(['/login']); // Redirigir a la pantalla de login
                } else {
                    console.log('Failed to delete user:', response.status);
                }
            });
        } else {
            console.log('No username available for deletion');
        }
    });
}

}
