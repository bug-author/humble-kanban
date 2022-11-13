import { User, LoginResponse } from './auth.model';
import { TestBed } from '@angular/core/testing';
import { ApiClientService } from '../api-client/api-client.service';

import { AuthService } from './auth.service';
import { of } from 'rxjs';

class MockApiClientService {
  post() {
    const loginResponse: LoginResponse = {
      token: 'test-token',
      user: {} as User,
    };
    return of(loginResponse);
  }
}

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ApiClientService, useClass: MockApiClientService },
      ],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save token after successful login', () => {
    service.login('test', 'test').subscribe(() => {
      expect(service.getToken()).toBe('test-token');
    });
  });

  it('should remove token after logout', () => {
    // @ts-expect-error
    service.token = 'test-token';

    service.logout();
    expect(service.getToken()).toBeNull();
    expect(localStorage.getItem('token')).toBeNull();
  });
});
