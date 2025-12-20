import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
    id?: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
}

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:8088/api/users'; // User Service

    getUsers(): Observable<any> {
        return this.http.get<any>(this.apiUrl);
    }
}
