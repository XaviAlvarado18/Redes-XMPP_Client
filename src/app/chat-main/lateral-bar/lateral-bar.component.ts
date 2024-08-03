import { Component } from '@angular/core';
import { ImageButtonComponent } from '../../image-button/image-button.component';

@Component({
  selector: 'app-lateral-bar',
  standalone: true,
  imports: [ImageButtonComponent],
  templateUrl: './lateral-bar.component.html',
  styleUrl: './lateral-bar.component.scss'
})
export class LateralBarComponent {



  onItemClick(item: any) {
    // Manejar el clic en los elementos de la barra lateral
    console.log('Clicked on:', item.name);
  }

  handleClick() {
    console.log('Button clicked!');
  }

}
