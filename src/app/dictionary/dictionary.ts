import { Component, inject, signal } from '@angular/core';
import { Words } from './words';
import { Word } from '../models';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';

@Component({
  imports: [],
  selector: 'app-dictionary',
  styleUrl: './dictionary.scss',
  templateUrl: './dictionary.html',
})
export class Dictionary {
  private readonly wordsService = inject(Words);
  readonly words = signal<Word[]>([]);
  isLoading = signal(false);
  error = signal<string | null>(null);

  constructor() {
    this.isLoading.set(true);
    this.error.set(null);
    this.wordsService
      .fetchOwnWords({
        page: 1,
        limit: 7,
      })
      .pipe(
        finalize(() => {
          this.isLoading.set(false);
        }),
        takeUntilDestroyed(),
      )
      .subscribe({
        next: ({ results }) => this.words.set(results),
        error: (err) => {
          this.error.set('Oops! Something went wrong!');
          console.error(err);
        },
      });

  }
}
