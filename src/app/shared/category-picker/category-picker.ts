import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TitleCasePipe } from '@angular/common';

@Component({
  imports: [ReactiveFormsModule, TitleCasePipe],
  selector: 'app-category-picker',
  styleUrl: './category-picker.scss',
  templateUrl: './category-picker.html',
})
export class CategoryPicker {
  form = input.required<FormGroup>();
  categories = input.required<string[]>();
  direction = input<'row' | 'column'>('column');
  variant = input<'default' | 'inverse'>('default');

  get isVerb(): boolean {
    return this.form().controls['category'].value === 'verb';
  }
}
