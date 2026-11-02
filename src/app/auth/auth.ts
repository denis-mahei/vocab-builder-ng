import { HttpClient } from '@angular/common/http';
import { computed, inject, Service, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthResponse, SignInRequest, User } from '../models';

@Service()
export class Auth {
  private readonly http = inject(HttpClient);
  private readonly _user = signal<Omit<User, '_id'> | null>(null)
  readonly user = this._user.asReadonly();
  readonly isLoggedIn = computed(() => this._user() !== null );

  signIn(credentials: SignInRequest) {
    this.http.post<AuthResponse>(environment.apiUrl + '/users/signin', credentials).subscribe({
      next: (user) => {
        localStorage.setItem('token', user.token);
        this._user.set({ name: user.name, email: user.email });
      },
    });

  }
}
