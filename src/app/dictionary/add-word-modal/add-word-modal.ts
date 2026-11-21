import { Component, inject } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CategoryPicker } from '../../shared/category-picker/category-picker';

@Component({
  imports: [ReactiveFormsModule, CategoryPicker],
  selector: 'app-add-word-modal',
  styleUrl: './add-word-modal.scss',
  templateUrl: './add-word-modal.html',
})
export class AddWordModal {
  dialogRef = inject<DialogRef>(DialogRef);
  data = inject(DIALOG_DATA);

  closeModal(): void {
    this.dialogRef.close();
  }

  form = new FormGroup({
    category: new FormControl('verb', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    isIrregular: new FormControl(false, { nonNullable: true }),
    ua: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.pattern(/^(?![A-Za-z])[А-ЯІЄЇҐґа-яієїʼ\s]+$/u),
      ],
    }),
    en: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.pattern(/^\b[A-Za-z'-]+(?:\s+[A-Za-z'-]+)*$/),
      ],
    }),
  });

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    console.log(this.form.getRawValue());
  }

  inputError(lang: 'ua' | 'en'):boolean {
    return (
      this.form.controls[lang].invalid &&
      (this.form.controls[lang].dirty || this.form.controls[lang].touched)
    );
  }
  isError(lang: 'ua' | 'en', option: 'required' | 'pattern') {
    return this.form.controls[lang].hasError(option);
  }

  get showHint():boolean {
    return (
      this.form.controls['isIrregular'].value &&
      this.form.controls['category'].value === 'verb'
    );
  }
}
