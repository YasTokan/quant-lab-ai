import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type ConfigResponse = {
  toEmail: string;
  sendTime: string; // HH:MM
  timezone: string;
};

export type ConfigUpdateRequest = {
  toEmail?: string;
  sendTime?: string;
  sendNow?: boolean;
};

export type JobResponse = {
  ok: boolean;
  usDate?: string;
  matches?: string[];
  error?: string;
};

@Injectable({
  providedIn: 'root'
})
export class AutomationApiService {
  // For dev: point to your Fastify server
  // private baseUrl = 'http://localhost:3000';
  private baseUrl = 'https://quant-lab-task.vercel.app';

  constructor(private http: HttpClient) {}

  getConfig(): Observable<ConfigResponse> {
    return this.http.get<ConfigResponse>(`${this.baseUrl}/config`);
  }

  updateConfig(body: ConfigUpdateRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/config`, body);
  }

  sendNow(toEmail?: string): Observable<JobResponse> {
    return this.http.post<JobResponse>(`${this.baseUrl}/send-now`, toEmail ? { toEmail } : {});
  }
}
