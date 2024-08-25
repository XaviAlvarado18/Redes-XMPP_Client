// view-state.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StatusModalComponent } from './status-modal/status-modal.component';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-view-state',
  standalone: true,
  imports: [CommonModule, FormsModule, StatusModalComponent],
  templateUrl: './view-state.component.html',
  styleUrl: './view-state.component.scss'
})
export class ViewStateComponent implements OnInit {
  statuses = ['available', 'absent', 'unavailable', 'busy', 'offline'];
  currentStatus: string = 'available';
  isModalOpen = false;
  statusMessage: string = '';
  lastCheck: string = '1/08/2024';
  
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getCurrentStatus().subscribe(status => {
      console.log("status: ", status);
      this.currentStatus = status;
    });
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  updateStatus(newStatus: string) {
    this.currentStatus = newStatus;
    console.log("currenStatus: ", this.currentStatus);

    this.authService.changeStatus(newStatus).subscribe(response => {
      if (response.status.includes('status changed')) {
        this.currentStatus = newStatus;
        console.log('Status changed to:', newStatus);
      } else {
        console.error('Error changing status:', response);
      }
    });
    this.closeModal();
  }

  getStatusClass() {
    return this.currentStatus.toLowerCase();
  }

}