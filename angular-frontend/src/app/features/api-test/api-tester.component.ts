import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
    selector: 'app-api-tester',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
    <div class="space-y-6 animate-float">
      <div class="flex items-center justify-between">
        <h1 class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">API Tester</h1>
        <div class="flex items-center gap-2">
            <span class="text-xs text-gray-500 uppercase font-bold">Environment:</span>
            <span class="bg-green-500/20 text-green-500 px-2 py-1 rounded text-xs font-mono">LOCALHOST</span>
        </div>
      </div>

       <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Request Panel -->
            <div class="lg:col-span-1 space-y-4">
                <div class="glass-card p-6">
                    <label class="block text-xs font-medium text-gray-400 uppercase mb-2">Method</label>
                    <div class="grid grid-cols-4 gap-2 mb-4">
                        <button (click)="method = 'GET'" [class.bg-blue-500]="method === 'GET'" [class.text-white]="method === 'GET'" class="py-2 rounded bg-white/5 text-gray-400 font-bold transition-all">GET</button>
                        <button (click)="method = 'POST'" [class.bg-green-500]="method === 'POST'" [class.text-white]="method === 'POST'" class="py-2 rounded bg-white/5 text-gray-400 font-bold transition-all">POST</button>
                        <button (click)="method = 'PUT'" [class.bg-yellow-500]="method === 'PUT'" [class.text-white]="method === 'PUT'" class="py-2 rounded bg-white/5 text-gray-400 font-bold transition-all">PUT</button>
                        <button (click)="method = 'DELETE'" [class.bg-red-500]="method === 'DELETE'" [class.text-white]="method === 'DELETE'" class="py-2 rounded bg-white/5 text-gray-400 font-bold transition-all">DEL</button>
                    </div>

                    <label class="block text-xs font-medium text-gray-400 uppercase mb-2">Endpoint URL</label>
                    <input type="text" [(ngModel)]="url" placeholder="http://localhost:8080/api/..." class="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white font-mono text-sm focus:border-primary focus:outline-none mb-4">
                    
                    <div *ngIf="method === 'POST' || method === 'PUT'">
                        <label class="block text-xs font-medium text-gray-400 uppercase mb-2">Body (JSON)</label>
                        <textarea [(ngModel)]="body" rows="6" class="w-full bg-black/20 border border-white/10 rounded-lg p-4 text-white font-mono text-xs focus:border-primary focus:outline-none resize-none" placeholder="{ ... }"></textarea>
                    </div>

                    <button (click)="sendRequest()" [disabled]="isLoading" class="w-full mt-4 bg-primary hover:bg-primary/80 text-white font-bold py-3 rounded-lg shadow-lg flex items-center justify-center gap-2 transition-all">
                        <span *ngIf="isLoading" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        Send Request
                    </button>
                </div>
            </div>

            <!-- Response Panel -->
            <div class="lg:col-span-2">
                <div class="glass-card h-full flex flex-col min-h-[500px]">
                    <div class="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
                        <span class="text-sm font-bold text-gray-300">Response</span>
                        <div *ngIf="responseStatus" class="flex items-center gap-2">
                            <span class="text-xs text-gray-500">Status:</span>
                            <span [class.text-green-400]="responseStatus >= 200 && responseStatus < 300" 
                                  [class.text-red-400]="responseStatus >= 400"
                                  class="font-mono font-bold">{{responseStatus}}</span>
                             <span class="text-xs text-gray-500 ml-2">Time:</span>
                             <span class="text-white font-mono text-xs">{{responseTime}}ms</span>
                        </div>
                    </div>
                    
                    <div class="flex-1 p-4 overflow-auto bg-black/40 font-mono text-xs">
                        <pre *ngIf="responseBody" [class.text-red-400]="isError" [class.text-green-300]="!isError" class="whitespace-pre-wrap break-all">{{responseBody}}</pre>
                        <div *ngIf="!responseBody && !isLoading" class="h-full flex items-center justify-center text-gray-600">
                            No response data
                        </div>
                         <div *ngIf="isLoading" class="h-full flex items-center justify-center text-gray-500">
                            Sending request...
                        </div>
                    </div>
                </div>
            </div>
       </div>
    </div>
    `
})
export class ApiTesterComponent {
    http = inject(HttpClient);

    method = 'GET';
    url = 'http://localhost:8080/api/products';
    body = '';

    isLoading = false;
    responseStatus: number | null = null;
    responseBody: string | null = null;
    responseTime: number | null = null;
    isError = false;

    sendRequest() {
        this.isLoading = true;
        this.responseStatus = null;
        this.responseBody = null;
        this.isError = false;

        const start = Date.now();
        const headers = new HttpHeaders().set('Content-Type', 'application/json');

        let request;
        if (this.method === 'GET') request = this.http.get(this.url, { observe: 'response' });
        else if (this.method === 'DELETE') request = this.http.delete(this.url, { observe: 'response' });
        else {
            let parsedBody = {};
            try { parsedBody = this.body ? JSON.parse(this.body) : {}; } catch (e) {
                this.isError = true; this.responseBody = 'Invalid JSON Body'; this.isLoading = false; return;
            }
            if (this.method === 'POST') request = this.http.post(this.url, parsedBody, { headers, observe: 'response' });
            else request = this.http.put(this.url, parsedBody, { headers, observe: 'response' });
        }

        request.subscribe({
            next: (res) => {
                this.isLoading = false;
                this.responseTime = Date.now() - start;
                this.responseStatus = res.status;
                this.responseBody = JSON.stringify(res.body, null, 2);
            },
            error: (err) => {
                this.isLoading = false;
                this.responseTime = Date.now() - start;
                this.responseStatus = err.status;
                this.isError = true;
                this.responseBody = JSON.stringify(err.error || err.message, null, 2);
            }
        });
    }
}
