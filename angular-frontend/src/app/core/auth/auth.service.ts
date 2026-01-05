import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap, catchError, throwError } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private http = inject(HttpClient);
    private router = inject(Router);



    private apiUrl = `${environment.apiUrl}/auth`; // User Service
    private currentUserSubject = new BehaviorSubject<any>(this.getUserFromToken());
    public currentUser$ = this.currentUserSubject.asObservable();

    constructor() { }

    login(credentials: any): Observable<any> {
        // Backend expects 'username', but frontend form uses 'email'
        const payload = {
            username: credentials.email, // Map email to username
            password: credentials.password
        };

        return this.http.post(`${this.apiUrl}/login`, payload).pipe(
            tap((response: any) => {
                // Backend returns 'access_token'
                if (response.access_token) {
                    localStorage.setItem('jwtToken', response.access_token);
                    this.currentUserSubject.next(this.getUserFromToken());
                }
            })
        );
    }

    logout() {
        localStorage.removeItem('jwtToken');
        this.currentUserSubject.next(null);
        this.router.navigate(['/auth']);
    }

    getToken(): string | null {
        return localStorage.getItem('jwtToken');
    }

    private getUserFromToken(): any {
        const token = this.getToken();
        if (token) {
            try {
                return jwtDecode(token);
            } catch {
                return null;
            }
        }
        return null;
    }

    isAuthenticated(): boolean {
        const token = this.getToken();
        // Add expiration check here if needed
        return !!token;
    }
}
