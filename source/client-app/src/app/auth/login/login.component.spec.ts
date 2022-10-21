import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './../../shared/shared.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { EMPTY, of, Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

import { LoginComponent } from './login.component';

class MockAuthService {
  public login() {}
}

class MockRouter {
  public navigate() {}
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: Router, useClass: MockRouter },
      ],
      imports: [SharedModule, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to home page after successful login', () => {
    const authService = TestBed.inject(AuthService);
    const router = TestBed.inject(Router);

    component.loginForm.controls.email.setValue('test@example.com');
    component.loginForm.controls.password.setValue('test1234');

    const navigateSpy = spyOn(router, 'navigate');
    const loginSpy = spyOn(authService, 'login').and.returnValue(of(undefined));

    component.login();

    expect(loginSpy).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });

  it('should display validation error message for email', () => {
    component.loginForm.controls.email.setValue('');
    expect(component.getEmailErrorMessage()).toBe('You must enter a value');

    component.loginForm.controls.email.setValue('test');
    expect(component.getEmailErrorMessage()).toBe('Not a valid email');
  });

  it('should display validation error message for password', () => {
    component.loginForm.controls.password.setValue('');
    expect(component.getPasswordErrorMessage()).toBe('You must enter a value');

    component.loginForm.controls.password.setValue('test');
    expect(component.getPasswordErrorMessage()).toBe(
      'Password must be at least 8 characters long'
    );
  });
});
