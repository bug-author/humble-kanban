import { Observable, map } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApiClientService } from '../api-client/api-client.service';
import { LoginResponse, LoginRequest } from './auth.model';
import { AuthStore } from './auth.store';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private api: ApiClientService, private authStore: AuthStore) {}

  public login(username: string, password: string): Observable<void> {
    return this.api
      .post<LoginRequest, LoginResponse>('login', { username, password })
      .pipe(
        map((response) => {
          this.authStore.saveToken(response.token);
        })
      );
  }

  public logout(): void {
    this.authStore.removeToken();
  }
}
