import { Component, inject, signal } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CategoryPicker } from '../../shared/category-picker/category-picker';
import { WordFields } from '../../shared/word-fields/word-fields';
import { Words } from '../words';
import { WordRequest } from '../../models';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  imports: [ReactiveFormsModule, CategoryPicker, WordFields],
  selector: 'app-add-word-modal',
  styleUrl: './add-word-modal.scss',
  templateUrl: './add-word-modal.html',
})
export class AddWordModal {
  dialogRef = inject<DialogRef>(DialogRef);
  data = inject(DIALOG_DATA);
  private readonly wordService = inject(Words);
  readonly error = signal<string | null>(null);

  closeModal(): void {
    this.dialogRef.close();
  }

  form = new FormGroup({
    category: new FormControl('', {
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

  addWord(word: WordRequest) {
    this.error.set(null);
    this.wordService.createWord(word).subscribe({
      next: (created) => this.dialogRef.close(created),
      error: (err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 409) {
            this.error.set(err.error.message ?? 'Such a word has already exists!');
          } else {
            this.error.set('Oops, something went wrong.');
          }
        }
      },
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { isIrregular, ...rest } = this.form.getRawValue();
    this.addWord({
      ...rest,
      ...(rest.category === 'verb' ? { isIrregular } : {}),
    });
  }

  get showHint(): boolean {
    return (
      this.form.controls['isIrregular'].value &&
      this.form.controls['category'].value === 'verb'
    );
  }
}
