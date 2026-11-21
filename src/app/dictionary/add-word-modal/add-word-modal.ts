import { Component, inject } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TitleCasePipe } from '@angular/common';

@Component({
  imports: [ReactiveFormsModule, TitleCasePipe],
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

  get isVerb(): boolean {
    return this.form.controls["category"].value === 'verb';
  }

  inputError(lang: 'ua' | 'en') {
    return (
      this.form.controls[lang].invalid &&
      (this.form.controls[lang].dirty || this.form.controls[lang].touched)
    );
  }
  isError(lang: 'ua' | 'en', option: 'required' | 'pattern') {
    return this.form.controls[lang].hasError(option);
  }
}
