import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserBar } from '../user-bar/user-bar';
import { UserNav } from '../user-nav/user-nav';
import { LogoutButton } from '../logout-button/logout-button';

@Component({
  imports: [RouterLink, RouterLinkActive, UserBar, UserNav, LogoutButton],
  selector: 'app-header',
  styleUrl: './header.scss',
  templateUrl: './header.html',
})
export class Header {}
