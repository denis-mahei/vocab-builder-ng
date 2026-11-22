import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-form-fields',
  styleUrl: './word-fields.scss',
  templateUrl: './word-fields.html',
})
export class WordFields {
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
