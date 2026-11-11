import { Component, inject } from '@angular/core';
import { UserBar } from '../user-bar/user-bar';
import { UserNav } from '../user-nav/user-nav';
import { LogoutButton } from '../logout-button/logout-button';
import { Dialog } from '@angular/cdk/dialog';
import { MobileMenu } from '../mobile-menu/mobile-menu';
import { Overlay } from '@angular/cdk/overlay';

@Component({
  imports: [UserBar, UserNav, LogoutButton],
  selector: 'app-header',
  styleUrl: './header.scss',
  templateUrl: './header.html',
})
export class Header {
  private readonly dialog = inject(Dialog);
  private readonly overlay = inject(Overlay);

  openDialog() {
    this.dialog.open(MobileMenu, {
      width: '185px',
      height: '100%',
      positionStrategy: this.overlay.position().global().right('0').top('0'),
    });
  }
}
