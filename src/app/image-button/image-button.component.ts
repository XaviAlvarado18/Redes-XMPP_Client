// image-button.component.ts
import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LateralBarComponent } from '../chat-main/lateral-bar/lateral-bar.component';


@Component({
  selector: 'app-image-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button 
      (click)="onClick()" 
      [ngStyle]="{
        'width.px': width, 
        'height.px': height,
        'transform': 'translateY(' + translateY + 'px)'
      }">
      <img [src]="imageSrc" [alt]="altText">
    </button>
  `,
  styleUrls: ['./image-button.component.scss']
})
export class ImageButtonComponent {
  @Input() imageSrc: string = '';
  @Input() altText: string = '';
  @Input() width: number = 50; 
  @Input() height: number = 50;
  @Input() translateY: number = 0; 
  @Output() buttonClick: EventEmitter<void> = new EventEmitter<void>();

  onClick() {
    this.buttonClick.emit();
  }
}
