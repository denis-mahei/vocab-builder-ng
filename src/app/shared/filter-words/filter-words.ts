import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CategoryPicker } from '../category-picker/category-picker';

@Component({
  imports: [ReactiveFormsModule, CategoryPicker],
  selector: 'app-filter-words',
  styleUrl: './filter-words.scss',
  templateUrl: './filter-words.html',
})
export class FilterWords {
  readonly form = input.required<FormGroup>();
  readonly categories = input.required<string[]>();
}
