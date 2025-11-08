import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  credentials = { username: '', password: '' };
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  login(): void {
    this.authService.login(this.credentials).subscribe(
      response => {
        // Handle successful login
        console.log('Login successful', response);
        this.router.navigate(['/products']);
      },
      error => {
        // Handle login error
        console.error('Login failed', error);
        this.errorMessage = 'Invalid username or password';
      }
    );
  }

}
