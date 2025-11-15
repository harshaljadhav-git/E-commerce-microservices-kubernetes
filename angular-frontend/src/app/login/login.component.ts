'''
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Auth } from 'aws-amplify';

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
    try {
      await Auth.signIn(this.email, this.password);
      this.router.navigate(['/']);
    } catch (error: any) {
      this.errorMessage = error.message;
      if (error.code === 'UserNotConfirmedException') {
        this.isConfirming = true;
      }
    }
  }

  async signUp() {
    try {
      await Auth.signUp({
        username: this.email,
        password: this.password,
        attributes: {
          email: this.email
        }
      });
      this.isConfirming = true;
      this.isSigningUp = false;
    } catch (error: any) {
      this.errorMessage = error.message;
    }
  }

  async confirmSignUp() {
    try {
      await Auth.confirmSignUp(this.email, this.confirmationCode);
      await this.signIn();
    } catch (error: any) {
      this.errorMessage = error.message;
    }
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
'''