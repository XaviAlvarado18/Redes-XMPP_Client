import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-group-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './group-item.component.html',
  styleUrl: './group-item.component.scss'
})
export class GroupItemComponent {
  @Input() groupName: string = '';
  @Input() members: string[] = [];
  @Output() groupClick: EventEmitter<void> = new EventEmitter();

  onGroupClick(): void {
    this.groupClick.emit();
  }
}
