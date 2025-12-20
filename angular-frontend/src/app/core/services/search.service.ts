import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SearchService {
    private http = inject(HttpClient);
    // Conflict: Both Search and Promotion claim 8092. Using 8093 for Search assuming backend fix.
    private apiUrl = 'http://localhost:8093/api/search';

    search(query: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}?query=${query}`);
    }
}
