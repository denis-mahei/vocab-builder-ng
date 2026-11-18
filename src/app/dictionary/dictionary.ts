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
import { FilterWords } from '../shared/filter-words/filter-words';
import { FormControl, FormGroup } from '@angular/forms';

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
    term: new FormControl('', { nonNullable: true }),
  });

  constructor() {
    this.isLoading.set(true);
    this.error.set(null);

    this.searchWords.valueChanges
      .pipe(
        debounceTime(450),
        distinctUntilChanged((prev, curr) => {
          return prev.term?.trim() === curr.term?.trim();
        }),
        switchMap(({ term }) => {
          const keyword = term?.trim();
          const params: WordsParams = {
            page: 1,
            limit: 7,
            ...(keyword ? { keyword } : {}),
          };
          return this.wordsService
            .fetchOwnWords(params)
            .pipe(catchError(() => EMPTY));
        }),
        takeUntilDestroyed(),
      )
      .subscribe(({ results }) => {
        this.words.set(results);
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
