import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Notification {
    id?: string;
    recipient: string;
    message: string;
    subject: string;
    sentAt: string;
}

import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/notifications`; // Notification Service

    getNotifications(): Observable<any> {
        return this.http.get<any>(this.apiUrl);
    }
}
