import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LateralBarComponent } from './lateral-bar/lateral-bar.component';
import { ChatContainerComponent } from '../chat-container/chat-container.component';
import { ViewStateComponent } from './view-state/view-state.component';
import { ViewWorkareaComponent } from './view-workarea/view-workarea.component';
import { Router, NavigationEnd } from '@angular/router';
import { ChatComponent } from "./chat/chat.component";
import { ContactAreaBarComponent } from "./contact-area-bar/contact-area-bar.component";
import { ViewContactareaComponent } from "./view-contactarea/view-contactarea.component";


@Component({
  selector: 'app-chat-main',
  standalone: true,
  imports: [RouterOutlet, CommonModule, LateralBarComponent, ChatContainerComponent, ViewStateComponent, ViewWorkareaComponent, ChatComponent, ContactAreaBarComponent, ViewContactareaComponent],
  templateUrl: './chat-main.component.html',
  styleUrl: './chat-main.component.scss'
})
export class ChatMainComponent {
  isViewState: boolean = true;
  isWorkArea: boolean = false;
  isContactArea: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isViewState = event.url === '/chat-main';
        this.isWorkArea = event.url === '/workarea';
        this.isContactArea = event.url === '/contactarea';
      }
    });
  }

  toggleWorkArea() {
    this.isWorkArea = !this.isWorkArea;
    if (this.isWorkArea) {
      this.isContactArea = false;
    }
  }

  toggleContactArea() {
    this.isContactArea = !this.isContactArea;
    if (this.isContactArea) {
      this.isWorkArea = false;
    }
  }
  
}
