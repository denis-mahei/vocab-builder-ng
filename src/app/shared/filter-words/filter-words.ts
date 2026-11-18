import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-filter-words',
  styleUrl: './filter-words.scss',
  templateUrl: './filter-words.html',
})
export class FilterWords {
  readonly form = input.required<FormGroup>();
  readonly categories = input.required<string[]>();

  get isVerb(): boolean {
    return this.form().get('category')?.value === 'verb';
  }
}
