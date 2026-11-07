import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-user-nav',
  styleUrl: './user-nav.scss',
  templateUrl: './user-nav.html',
})
export class UserNav {}
