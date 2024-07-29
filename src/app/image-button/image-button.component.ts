// image-button.component.ts
import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-image-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button (click)="onClick()" [ngStyle]="{'width.px': width, 'height.px': height}">
      <img [src]="imageSrc" [alt]="altText">
    </button>
  `,
  styleUrls: ['./image-button.component.scss']
})
export class ImageButtonComponent {
  @Input() imageSrc: string = '';
  @Input() altText: string = '';
  @Input() width: number = 50;  // Default width
  @Input() height: number = 50; // Default height
  @Output() buttonClick: EventEmitter<void> = new EventEmitter<void>();

  onClick() {
    this.buttonClick.emit();
  }
}
