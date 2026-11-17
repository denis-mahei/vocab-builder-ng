import { Component, inject, signal } from '@angular/core';
import { Words } from './words';
import { Word, WordsParams } from '../models';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  EMPTY,
  finalize,
  switchMap,
} from 'rxjs';
import { WordsTable } from '../shared/words-table/words-table';
import { FormControl, FormGroup } from '@angular/forms';
import { FilterWords } from '../shared/filter-words/filter-words';

@Component({
  imports: [WordsTable, FilterWords],
  selector: 'app-dictionary',
  styleUrl: './dictionary.scss',
  templateUrl: './dictionary.html',
})
export class Dictionary {
  private readonly wordsService = inject(Words);
  readonly words = signal<Word[]>([]);

  isLoading = signal(false);
  error = signal<string | null>(null);

  searchWords = new FormGroup({
    keyword: new FormControl('', { nonNullable: true }),
  });

  constructor() {
    this.isLoading.set(true);
    this.error.set(null);

    this.searchWords.valueChanges
      .pipe(
        debounceTime(350),
        distinctUntilChanged((previous, current) => {
          return previous.keyword?.trim() === current.keyword?.trim();
        }),
        switchMap(({ keyword }) => {
          const term = keyword?.trim();
          const params: WordsParams = {
            page: 1,
            limit: 7,
            ...(term ? { keyword: term } : {}),
          };

          return this.wordsService.fetchOwnWords(params);
        }),
        takeUntilDestroyed(),
      )
      .pipe(catchError(() => EMPTY))
      .subscribe((data) => {
        this.words.set(data.results);
      });

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
          console.error(err.message);
        },
      });
  }
}
