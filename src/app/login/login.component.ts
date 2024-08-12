import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username')?.value;
      const password = this.loginForm.get('password')?.value;
      //console.log('username', username);
  
      this.authService.login(username, password).subscribe(
        response => {
          if (response.status === 'connected') { // Verifica el estado de la respuesta
            console.log('Login successful', response);
            this.router.navigate(['/chat-main']); // Navega solo si el login es exitoso
          } else {
            console.error('Login failed with status:', response.status);
            alert('Login failed: ' + response.status); // Muestra el error de la respuesta
          }
        },
        error => {
          console.error('Login failed', error);
          alert('Login failed: ' + (error.error?.message || 'Unknown error')); // Muestra el error recibido
        }
      );
    }
  }
  
  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
