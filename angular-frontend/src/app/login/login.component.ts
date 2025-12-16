
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email = '';
  password = '';
  confirmationCode = '';
  errorMessage = '';
  isConfirming = false;
  isSigningUp = false;

  constructor(private router: Router) { }

  async signIn() {
    console.log('Sign in logic removed (Amplify removed)');
    this.router.navigate(['/']);
  }

  async signUp() {
    console.log('Sign up logic removed (Amplify removed)');
  }

  async confirmSignUp() {
    console.log('Confirm sign up logic removed (Amplify removed)');
    await this.signIn();
  }

  showSignUp() {
    this.isSigningUp = true;
    this.isConfirming = false;
    this.errorMessage = '';
    this.email = '';
    this.password = '';
  }

  showSignIn() {
    this.isSigningUp = false;
    this.isConfirming = false;
    this.errorMessage = '';
    this.email = '';
    this.password = '';
  }
}