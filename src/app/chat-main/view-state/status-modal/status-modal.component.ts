import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-status-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './status-modal.component.html',
  styleUrl: './status-modal.component.scss'
})
export class StatusModalComponent {

  @Input() statuses: string[] = [];
  @Output() statusSelected = new EventEmitter<string>();
  @Output() closeModal = new EventEmitter<void>();

  selectedStatus: string | null = null;

  selectStatus(status: string) {
    this.selectedStatus = status;
  }

  changeStatus() {
    if (this.selectedStatus) {
      this.statusSelected.emit(this.selectedStatus);
    }
  }

  cancel() {
    this.closeModal.emit();
  }
}
