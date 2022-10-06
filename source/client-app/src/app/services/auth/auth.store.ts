import { User } from './auth.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthStore {
  public user?: User;

  // We don't manipulate token directly, because it needs to be synced with localStorage
  private token?: string | null;

  constructor() {
    this.token = localStorage.getItem('token');
  }

  public saveToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  public removeToken(): void {
    this.token = undefined;
    localStorage.removeItem('token');
  }

  public getToken(): string | undefined | null {
    const token = this.token;
    return token;
  }
}
