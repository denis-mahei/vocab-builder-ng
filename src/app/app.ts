import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { RouterOutlet } from '@angular/router';
import { Auth } from './auth/auth';

@Component({
  imports: [RouterOutlet, FormsModule, ReactiveFormsModule],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('vocab-builder-ng');
  protected readonly auth = inject(Auth)

  readonly loginForm = new FormGroup({
    email: new FormControl('', {nonNullable: true ,validators:[Validators.required, Validators.email]}),
    password: new FormControl('', { nonNullable: true,validators: Validators.required}),
  })

  onSubmit() {
    this.auth.signIn(this.loginForm.getRawValue());
  }
}
