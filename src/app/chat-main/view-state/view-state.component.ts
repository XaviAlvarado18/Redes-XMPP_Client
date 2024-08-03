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
  available: boolean = true;
  statusMessage: string = '';
  lastCheck: string = '1/08/2024';
  
  constructor() { }

  ngOnInit(): void { }

  toggleAvailability(): void {
    this.available = !this.available;
  }

  updateMessage(event: Event): void {
    this.statusMessage = (event.target as HTMLInputElement).value;
  }
}