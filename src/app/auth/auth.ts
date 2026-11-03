import { HttpClient } from '@angular/common/http';
import { computed, inject, Service, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import {
  AuthResponse,
  CurrentResponse,
  SignInRequest,
  SignUpRequest,
  User,
} from '../models';
import { catchError, finalize, Observable, of, tap } from 'rxjs';

@Service()
export class Auth {
  private readonly http = inject(HttpClient);
  private readonly _user = signal<Omit<User, '_id'> | null>(null);
  readonly user = this._user.asReadonly();
  readonly isLoggedIn = computed(() => this._user() !== null);

  private saveSession(user: AuthResponse) {
    localStorage.setItem('token', user.token);
    this._user.set({
      name: user.name,
      email: user.email,
    });
  }

  signUp(credentials: SignUpRequest) {
    return this.http
      .post<AuthResponse>(environment.apiUrl + '/users/signup', credentials)
      .pipe(tap((current) => this.saveSession(current)));
  }

  signIn(credentials: SignInRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(environment.apiUrl + '/users/signin', credentials)
      .pipe(tap((current) => this.saveSession(current)));
  }
  getCurrent(): Observable<CurrentResponse | null> {
    const token = localStorage.getItem('token');
    if (!token) {
      return of(null);
    }
    return this.http
      .get<CurrentResponse>(environment.apiUrl + '/users/current')
      .pipe(
        tap((current) =>
          this._user.set({
            name: current.name,
            email: current.email,
          }),
        ),
        catchError(() => {
          localStorage.removeItem('token');
          return of(null);
        }),
      );
  }
  signOut() {
    return this.http.post(environment.apiUrl + '/users/signout', null).pipe(
      finalize(() => {
        localStorage.removeItem('token');
        this._user.set(null);
      }),
    );
  }
}
