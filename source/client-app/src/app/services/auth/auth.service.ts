import { Observable, map } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApiClientService } from '../api-client/api-client.service';
import { LoginResponse, LoginRequest } from './auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // We don't manipulate token directly, because it needs to be synced with localStorage
  private token?: string | null;

  constructor(private api: ApiClientService) {
    this.token = localStorage.getItem('token');
  }

  /**
   * Temporarily we are using mock api from reqres.in
   * @param username - to test use "eve.holt@reqres.in"
   * @param password  - any valid password will work
   * @returns observable<void>
   */
  public login(username: string, password: string): Observable<void> {
    return this.api
      .post<LoginRequest, LoginResponse>('login', { username, password })
      .pipe(
        map((response) => {
          this.saveToken(response.token);
        })

        // TODO: Handle errors after api is implemented
      );
  }

  public logout(): void {
    this.removeToken();
  }

  public getToken(): string | undefined | null {
    const token = this.token;
    return token;
  }

  private saveToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  private removeToken(): void {
    this.token = null;
    localStorage.removeItem('token');
  }
}
