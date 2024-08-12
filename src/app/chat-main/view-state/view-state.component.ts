// view-state.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-state',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-state.component.html',
  styleUrl: './view-state.component.scss'
})
export class ViewStateComponent implements OnInit {
  statuses = ['available', 'absent', 'unavailable', 'busy', 'offline'];
  currentStatus: string = 'available';
  selectedStatus: string | null = null;
  isDropdownOpen = false;
  statusMessage: string = '';
  lastCheck: string = '1/08/2024';
  isOpen: boolean = false;
  
  constructor() { }

  ngOnInit(): void { }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  updateMessage(event: Event): void {
    this.statusMessage = (event.target as HTMLInputElement).value;
  }

  selectStatus(status: string) {
    this.currentStatus = status;
    this.isOpen = false;
  }
}