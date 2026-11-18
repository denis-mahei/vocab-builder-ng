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
  readonly categories = signal<string[]>([]);

  isLoading = signal(false);
  error = signal<string | null>(null);

  searchWords = new FormGroup({
    term: new FormControl('', { nonNullable: true }),
    category: new FormControl("",{nonNullable: true}),
  });

  constructor() {
    this.isLoading.set(true);
    this.error.set(null);

    this.wordsService.fetchCategories().subscribe({
      next: category => this.categories.set(category),
      error: () => this.error.set("Oops, something went wrong"),
    })

    this.searchWords.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged((prev, curr) => {
          return prev.term?.trim() === curr.term?.trim() && prev.category === curr.category;
        }),
        switchMap(({ term, category }) => {
          const keyword = term?.trim();
          const params: WordsParams = {
            page: 1,
            limit: 7,
            ...(category ? {category} : {}),
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
