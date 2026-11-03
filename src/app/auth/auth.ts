import { HttpClient } from '@angular/common/http';
import { computed, inject, Service, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthResponse, CurrentResponse, SignInRequest, User } from '../models';
import { catchError, Observable, of, tap } from 'rxjs';

@Service()
export class Auth {
  private readonly http = inject(HttpClient);
  private readonly _user = signal<Omit<User, '_id'> | null>(null);
  readonly user = this._user.asReadonly();
  readonly isLoggedIn = computed(() => this._user() !== null);

  signIn(credentials: SignInRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(environment.apiUrl + '/users/signin', credentials).pipe(
      tap((current) => {
        localStorage.setItem('token', current.token);
        this._user.set({ name: current.name, email: current.email });
      }),
    );
  }

  getCurrent(): Observable<CurrentResponse | null> {
    const token = localStorage.getItem('token');
    if (!token) {
      return of(null);
    }
    return this.http.get<CurrentResponse>(environment.apiUrl + '/users/current')
      .pipe(
      tap((current) => this._user.set({ name: current.name, email: current.email })),
      catchError(() => {
        localStorage.removeItem('token');
        return of(null);
      }),
    );
  }
}
