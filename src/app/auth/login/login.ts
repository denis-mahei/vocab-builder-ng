import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Auth } from '../auth';
import { Router, RouterLink } from '@angular/router';

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-login',
  styleUrl: './login.scss',
  templateUrl: './login.html',
})
export class Login {
  protected readonly auth = inject(Auth);
  private readonly router = inject(Router);

  readonly loginForm = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.pattern(/^(?=.*[a-zA-Z]{6})(?=.*\d)[a-zA-Z\d]{7}$/),
      ],
    }),
  });

  get email() {
    return this.loginForm.controls.email;
  }
  get emailError() {
    return this.email.invalid && (this.email.dirty || this.email.touched);
  }

  get password() {
    return this.loginForm.controls.password;
  }

  get passwordError() {
    return this.password.invalid && (this.password.dirty || this.password.touched);
  }

  onSubmit() {
    this.auth.signIn(this.loginForm.getRawValue()).subscribe({
      next: () => this.router.navigate(['/dictionary']),
    });
  }
}
