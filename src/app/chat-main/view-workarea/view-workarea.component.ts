import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LateralBarComponent } from '../lateral-bar/lateral-bar.component';
import { WorkAreaBarComponent } from "../work-area-bar/work-area-bar.component";
import { ChatComponent } from "../chat/chat.component";
import { GroupRequest } from '../work-area-bar/GroupRequest.model';
import { AuthService } from '../../auth.service';
import { MessageXMPP } from '../work-area-bar/message-xmpp.model';

@Component({
  selector: 'app-view-workarea',
  standalone: true,
  imports: [LateralBarComponent, WorkAreaBarComponent, ChatComponent, CommonModule],
  templateUrl: './view-workarea.component.html',
  styleUrl: './view-workarea.component.scss'
})
export class ViewWorkareaComponent {

  workAreaBarPosition = 0;
  showChat = false;
  selectedMessages: any[] = [];  // Almacena los mensajes seleccionados
  messagesPerSender: any[] = [];
  group: any;

  constructor(private cd: ChangeDetectorRef, private authService: AuthService) {}

  handleMessageSelected(messages: any[]) {
    this.selectedMessages = messages;  // Almacena los mensajes seleccionados
    this.showChat = true;
    console.log("Chat should be visible now.", this.selectedMessages);
    this.cd.detectChanges(); // Forzar la detección de cambios si es necesario
  }

  handleGroupSelected(messages: any[]): void {
    this.selectedMessages = messages
    //console.log('Grupo seleccionado en el componente principal:', messages);
    // Aquí puedes realizar la lógica para cargar los mensajes del grupo
    //this.loadGroupMessages(group);
    this.showChat = true;
  }

  handleGroup(group: any[]): void {
    this.group = group
    //console.log("handleGroup: ", group);
    //console.log('Grupo seleccionado en el componente principal:', messages);
    // Aquí puedes realizar la lógica para cargar los mensajes del grupo
    //this.loadGroupMessages(group);
    //this.showChat = true;
  }


  // Método para manejar el evento messagePerSender
  handleMessagePerSender(messages: any[]) {
    console.log("Received messages per sender:", messages);
    this.messagesPerSender = messages;
    // Puedes añadir lógica adicional para manejar estos mensajes
  }

  // Método opcional para ocultar el chat (si necesitas una forma de cerrarlo)
  hideChat() {
    this.showChat = false;
  }

}
