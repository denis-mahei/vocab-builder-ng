import { Component, inject } from '@angular/core';
import { Auth } from '../auth';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-register',
  styleUrl: './register.scss',
  templateUrl: './register.html',
})
export class Register {
  protected readonly auth = inject(Auth);
  private readonly router = inject(Router);

  readonly registerForm = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
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
  get name() {
    return this.registerForm.controls.name;
  }

  get nameError() {
    return this.name.invalid && (this.name.touched || this.name.dirty);
  }

  get email() {
    return this.registerForm.controls.email;
  }

  get emailError() {
    return this.email.invalid && (this.email.dirty || this.email.touched);
  }

  get password() {
    return this.registerForm.controls.password;
  }

  get passwordError() {
    return this.password.invalid && (this.password.dirty || this.password.touched);
  }

  onSubmit() {
    this.auth.signUp(this.registerForm.getRawValue()).subscribe({
      next: () => this.router.navigate(['/dictionary']),
      error: (err) => console.log(err.message),
    });
  }

}
