import { RouterModule, Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ChatMainComponent } from './chat-main/chat-main.component';
import { ViewWorkareaComponent } from './chat-main/view-workarea/view-workarea.component';
import { NgModule } from '@angular/core';


export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'chat-main', component: ChatMainComponent},
  { path: 'workarea', component: ViewWorkareaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutes {}