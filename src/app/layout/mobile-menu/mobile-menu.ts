import { Component, inject } from '@angular/core';
import { UserBar } from '../user-bar/user-bar';
import { DialogRef } from '@angular/cdk/dialog';
import { UserNav } from '../user-nav/user-nav';
import { LogoutButton } from '../logout-button/logout-button';
import { NavigationEnd, Router, Event } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  imports: [UserBar, UserNav, LogoutButton],
  selector: 'app-mobile-menu',
  styleUrl: './mobile-menu.scss',
  templateUrl: './mobile-menu.html',
})
export class MobileMenu {
  private readonly dialogRef = inject<DialogRef>(DialogRef);
  private readonly router = inject(Router);

  constructor() {
    this.router.events.pipe(takeUntilDestroyed()).subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.closeDialog();
      }
    });
  }
  closeDialog() {
    this.dialogRef.close();
  }
}
