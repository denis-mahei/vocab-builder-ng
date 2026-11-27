import { Component, inject, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { _IdGenerator } from '@angular/cdk/a11y';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-word-fields',
  styleUrl: './word-fields.scss',
  templateUrl: './word-fields.html',
})
export class WordFields {
  readonly fieldsId = inject(_IdGenerator).getId('word-');
  form = input.required<FormGroup>();

  inputError(lang: 'ua' | 'en'): boolean {
    return (
      this.form().controls[lang].invalid &&
      (this.form().controls[lang].dirty || this.form().controls[lang].touched)
    );
  }
  isError(lang: 'ua' | 'en', option: 'required' | 'pattern') {
    return this.form().controls[lang].hasError(option);
  }
}
