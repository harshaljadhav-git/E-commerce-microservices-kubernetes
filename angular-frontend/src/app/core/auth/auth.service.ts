import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap, catchError, throwError } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private http = inject(HttpClient);
    private router = inject(Router);

    private apiUrl = 'http://localhost:8088/api/auth'; // User Service
    private currentUserSubject = new BehaviorSubject<any>(this.getUserFromToken());
    public currentUser$ = this.currentUserSubject.asObservable();

    constructor() { }

    login(credentials: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
            tap((response: any) => {
                if (response.token) {
                    localStorage.setItem('jwtToken', response.token);
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
