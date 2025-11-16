import { Injectable } from '@angular/core';
import { Auth } from 'aws-amplify';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  async signIn(email: string, password: string): Promise<any> {
    try {
      const user = await Auth.signIn(email, password);
      return user;
    } catch (error) {
      console.error('Error signing in', error);
      throw error;
    }
  }

  async signUp(email: string, password: string): Promise<any> {
    try {
      const { user } = await Auth.signUp({
        username: email,
        password,
        attributes: { email }
      });
      return user;
    } catch (error) {
      console.error('Error signing up', error);
      throw error;
    }
  }

  async confirmSignUp(email: string, code: string): Promise<any> {
    try {
      const result = await Auth.confirmSignUp(email, code);
      return result;
    } catch (error) {
      console.error('Error confirming sign up', error);
      throw error;
    }
  }

  async signOut(): Promise<any> {
    try {
      await Auth.signOut();
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error signing out', error);
      throw error;
    }
  }

  async isAuthenticated(): Promise<boolean> {
    try {
      await Auth.currentAuthenticatedUser();
      return true;
    } catch {
      return false;
    }
  }

  async getCurrentUser(): Promise<any> {
    try {
      const user = await Auth.currentAuthenticatedUser();
      return user;
    } catch (error) {
      console.error('Error getting current user', error);
      return null;
    }
  }
}
