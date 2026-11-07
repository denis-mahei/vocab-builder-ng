import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { Auth } from '../../auth/auth';

@Component({
  imports: [],
  selector: 'app-logout-button',
  styleUrl: './logout-button.scss',
  templateUrl: './logout-button.html',
})
export class LogoutButton {
  private readonly auth = inject(Auth);
  private readonly router = inject(Router);

  logout() {
    this.auth
      .signOut()
      .pipe(
        finalize(() => {
          this.router.navigate(['/login']);
        }),
      )
      .subscribe();
  }
}
