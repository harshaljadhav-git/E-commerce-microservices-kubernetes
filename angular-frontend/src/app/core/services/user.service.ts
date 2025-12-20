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

import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/users`; // User Service

    getUsers(): Observable<any> {
        return this.http.get<any>(this.apiUrl);
    }
}
