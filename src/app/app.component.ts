import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, RegisterComponent, HttpClientModule],
  templateUrl: './app.component.html',  
  styleUrl: './app.component.scss'
})



export class AppComponent {
  title = 'XMPP_client';
  var = "xd";
}
