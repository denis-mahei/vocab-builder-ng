import { Component, inject } from '@angular/core';
import { Auth } from '../../auth/auth';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

@Component({
  imports: [],
  selector: 'app-user-bar',
  styleUrl: './user-bar.scss',
  templateUrl: './user-bar.html',
})
export class UserBar {
  protected readonly auth = inject(Auth);
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
