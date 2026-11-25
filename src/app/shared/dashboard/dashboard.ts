import { Component, input } from '@angular/core';
import { FilterWords } from '../filter-words/filter-words';
import { FormGroup } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  imports: [FilterWords, RouterLink],
  selector: 'app-dashboard',
  styleUrl: './dashboard.scss',
  templateUrl: './dashboard.html',
})
export class Dashboard {
  readonly form = input.required<FormGroup>();
  readonly categories = input.required<string[]>();
  readonly toStudy = input.required<number | null>();
}
