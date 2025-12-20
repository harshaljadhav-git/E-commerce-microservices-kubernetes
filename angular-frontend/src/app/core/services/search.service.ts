import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SearchService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/search`; // Search Service

    search(query: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}?query=${query}`);
    }
}
