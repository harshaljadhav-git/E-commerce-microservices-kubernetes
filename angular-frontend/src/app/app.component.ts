import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { Hub } from 'aws-amplify';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-frontend';
  isAuthenticated = false;
  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() {
    Hub.listen('auth', ({ payload: { event } }) => {
      if (event === 'signIn' || event === 'autoSignIn') {
        this.isAuthenticated = true;
        this.router.navigate(['/']);
      } else if (event === 'signOut') {
        this.isAuthenticated = false;
        this.router.navigate(['/login']);
      }
    });
  }

  async ngOnInit() {
    this.isAuthenticated = await this.authService.isAuthenticated();
  }

  signOut() {
    this.authService.signOut();
  }
}
