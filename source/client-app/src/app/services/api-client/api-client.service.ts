import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Headers } from './api-client.model';

@Injectable({
  providedIn: 'root',
})
export class ApiClientService {
  private baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = environment.apiUrl;
  }

  public get<T>(url: string, extraHeaders?: Headers): Observable<T> {
    const fullUrl = this.getFullUrl(this.baseUrl, url);
    const headers = {
      ...this.getDefaultHeaders(),
      ...extraHeaders,
    };

    return this.http.get<T>(fullUrl, { headers });
  }

  public post<T1, T2>(
    url: string,
    body: T1,
    extraHeaders?: Headers
  ): Observable<T2> {
    const fullUrl = this.getFullUrl(this.baseUrl, url);
    const headers = {
      ...this.getDefaultHeaders(),
      ...extraHeaders,
    };

    return this.http.post<T2>(fullUrl, body, { headers });
  }

  public put<T1, T2>(
    url: string,
    body: T1,
    extraHeaders?: Headers
  ): Observable<T2> {
    const fullUrl = this.getFullUrl(this.baseUrl, url);
    const headers = {
      ...this.getDefaultHeaders(),
      ...extraHeaders,
    };

    return this.http.put<T2>(fullUrl, body, { headers });
  }

  public delete<T>(url: string, extraHeaders?: Headers): Observable<T> {
    const fullUrl = this.getFullUrl(this.baseUrl, url);
    const headers = {
      ...this.getDefaultHeaders(),
      ...extraHeaders,
    };

    return this.http.delete<T>(fullUrl, { headers });
  }

  private getFullUrl(baseUrl: string, url: string): string {
    return `${baseUrl}/${url}`;
  }

  private getDefaultHeaders(): Headers {
    return {
      'Content-Type': 'application/json',
    };
  }
}
