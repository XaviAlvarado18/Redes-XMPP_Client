import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LateralBarComponent } from './lateral-bar/lateral-bar.component';
import { ChatContainerComponent } from '../chat-container/chat-container.component';
import { ViewStateComponent } from './view-state/view-state.component';
import { ViewWorkareaComponent } from './view-workarea/view-workarea.component';
import { Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-chat-main',
  standalone: true,
  imports: [RouterOutlet, CommonModule, LateralBarComponent, ChatContainerComponent, ViewStateComponent, ViewWorkareaComponent],
  templateUrl: './chat-main.component.html',
  styleUrl: './chat-main.component.scss'
})
export class ChatMainComponent {
  isViewState: boolean = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isViewState = event.url === '/chat-main';
      }
    });
  }
  
}
