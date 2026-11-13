import { Component, inject, signal } from '@angular/core';
import { Words } from './words';
import { Word } from '../models';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  imports: [],
  selector: 'app-dictionary',
  styleUrl: './dictionary.scss',
  templateUrl: './dictionary.html',
})
export class Dictionary {
  private readonly wordsService = inject(Words);
  readonly words = signal<Word[]>([]);

  constructor() {
    this.wordsService
      .fetchOwnWords({
        page: 1,
        limit: 7,
      }).pipe(takeUntilDestroyed())
      .subscribe({
        next: ({ results }) => this.words.set(results),
        error: (err) => console.error(err.message),
        complete: () => console.log('Finished...'),
      });
  }
}
