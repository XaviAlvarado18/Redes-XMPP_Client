import { Component } from '@angular/core';
import { LateralBarComponent } from '../lateral-bar/lateral-bar.component';
import { WorkAreaBarComponent } from "../work-area-bar/work-area-bar.component";

@Component({
  selector: 'app-view-workarea',
  standalone: true,
  imports: [LateralBarComponent, WorkAreaBarComponent],
  templateUrl: './view-workarea.component.html',
  styleUrl: './view-workarea.component.scss'
})
export class ViewWorkareaComponent {

  workAreaBarPosition = -10;

}
