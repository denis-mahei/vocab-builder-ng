import { Component, inject, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TitleCasePipe } from '@angular/common';
import { _IdGenerator } from '@angular/cdk/a11y';


@Component({
  imports: [ReactiveFormsModule, TitleCasePipe],
  selector: 'app-category-picker',
  styleUrl: './category-picker.scss',
  templateUrl: './category-picker.html',
})
export class CategoryPicker {
  readonly categoryId = inject(_IdGenerator).getId('category-');
  form = input.required<FormGroup>();
  categories = input.required<string[]>();
  direction = input<'row' | 'column'>('column');
  variant = input<'default' | 'inverse'>('default');

  get isVerb(): boolean {
    return this.form().controls['category'].value === 'verb';
  }
}
