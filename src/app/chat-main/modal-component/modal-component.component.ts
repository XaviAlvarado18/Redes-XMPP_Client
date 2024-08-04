import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { LateralBarComponent } from '../lateral-bar/lateral-bar.component';

@Component({
  selector: 'app-modal-component',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './modal-component.component.html',
  styleUrl: './modal-component.component.scss'
})
export class ModalComponentComponent {

  constructor(private dialogRef: MatDialogRef<ModalComponentComponent>, private lateralBar: LateralBarComponent) {}

  closeSession() {
    this.lateralBar.closeSession();
    this.dialogRef.close();
  }

  deleteAccount() {
    // Lógica para eliminar la cuenta
    console.log('Delete account clicked');
    this.dialogRef.close();
  }

  closeModal() {
    this.dialogRef.close();
  }

}
