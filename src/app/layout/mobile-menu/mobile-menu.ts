import { Component, inject, signal } from '@angular/core';
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
  isClosing = signal(false);

  constructor() {
    this.router.events.pipe(takeUntilDestroyed()).subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.closeDialog();
      }
    });
    this.dialogRef.backdropClick.subscribe(() => {
      this.closeDialog();
    });
    this.dialogRef.keydownEvents.subscribe((event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        this.closeDialog()
      }
    });
  }
  closeDialog() {
    if (this.isClosing()) return;
    this.isClosing.set(true);
  }
  onAnimationEnd() {
    if (this.isClosing()) {
      this.dialogRef.close();
    }
  }
}
