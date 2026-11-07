import { Component, inject } from '@angular/core';
import { Auth } from '../../auth/auth';

@Component({
  imports: [],
  selector: 'app-user-bar',
  styleUrl: './user-bar.scss',
  templateUrl: './user-bar.html',
})
export class UserBar {
  protected readonly auth = inject(Auth);
}
