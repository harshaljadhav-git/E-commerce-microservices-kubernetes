import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Tax {
    id?: number;
    taxClass: string;
    rate: number;
    location: string;
}

import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TaxService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/taxes`; // Tax Service

    getTaxes(): Observable<any> {
        return this.http.get<any>(this.apiUrl);
    }
}
