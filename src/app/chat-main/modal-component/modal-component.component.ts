import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { LateralBarComponent } from '../lateral-bar/lateral-bar.component';

@Component({
  selector: 'app-modal-component',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, LateralBarComponent],
  templateUrl: './modal-component.component.html',
  styleUrl: './modal-component.component.scss'
})
export class ModalComponentComponent {

  constructor(private dialogRef: MatDialogRef<ModalComponentComponent>, private lateralBar: LateralBarComponent) {}

  closeSession() {
    this.clearCookies();
    this.lateralBar.closeSession();
    this.closeModal();
  }

  deleteAccount() {
    // Lógica para eliminar la cuenta
    this.lateralBar.deleteUser();
    this.dialogRef.close();
  }

  closeModal() {
    this.dialogRef.close();
  }

  clearCookies(): void {
    const cookies = document.cookie.split(";");
  
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    }
  }

}
