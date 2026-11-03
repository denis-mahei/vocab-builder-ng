import { Component, inject } from '@angular/core';

import { Router, RouterOutlet } from '@angular/router';
import { Auth } from './auth/auth';
import { finalize } from 'rxjs';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly auth = inject(Auth);
  private readonly router = inject(Router);

  logout() {
    this.auth.signOut()
      .pipe(finalize(() => {
        this.router.navigate(['/login']);
      }))
      .subscribe();
  }
}
