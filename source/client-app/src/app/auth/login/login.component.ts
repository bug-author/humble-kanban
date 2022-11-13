import { Router } from '@angular/router';
import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'hk-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  public login() {
    if (!this.loginForm.valid) return;

    // if form is valid, email and password are not empty
    this.authService
      .login(
        this.loginForm.controls.email.value!,
        this.loginForm.controls.password.value!
      )
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }

  public getEmailErrorMessage() {
    if (this.loginForm.controls.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.loginForm.controls.email.hasError('email')
      ? 'Not a valid email'
      : '';
  }

  public getPasswordErrorMessage() {
    if (this.loginForm.controls.password.hasError('required')) {
      return 'You must enter a value';
    }

    return this.loginForm.controls.password.hasError('minlength')
      ? 'Password must be at least 8 characters long'
      : '';
  }
}
