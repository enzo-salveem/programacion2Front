import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';
import { CredencialesService } from 'src/app/services/credenciales.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(public authService: AuthService, private router: Router, private credenciales: CredencialesService) {}

  login(): void {
    this.authService
      .login({ username: this.username, password: this.password })
      .subscribe(
        (response) => {
          const token = response.token; // Ajusta según la respuesta de tu servidor
          this.authService.setToken(token);
          this.credenciales.cambiarUsuario(response.user)
          localStorage.setItem('user', JSON.stringify(response.user));
         
          this.router.navigate(['/home']);
        },
        (error) => {
          console.error('Login failed', error);
        }
      );
  }
}
