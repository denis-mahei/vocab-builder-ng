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
import { Dashboard } from '../shared/dashboard/dashboard';
import { Dialog } from '@angular/cdk/dialog';
import { AddWordModal } from './add-word-modal/add-word-modal';

@Component({
  imports: [WordsTable, Dashboard],
  selector: 'app-dictionary',
  styleUrl: './dictionary.scss',
  templateUrl: './dictionary.html',
})
export class Dictionary {
  private readonly wordsService = inject(Words);
  readonly words = signal<Word[]>([]);
  readonly categories = signal<string[]>([]);
  readonly toStudy = signal<number>(0);
  private readonly dialog = inject(Dialog);

  addWordDialog(): void {
    const dialogRef = this.dialog.open(AddWordModal, {
      panelClass: 'add-word-modal-pane',
      ariaLabelledBy: 'add-word-dialog-title',
      data: {
        categories: this.categories(),
      },
    });
    dialogRef.closed.subscribe((result) => {
      console.log('Result:', result);
    });
  }

  isLoading = signal(false);
  error = signal<string | null>(null);

  private buildParams(params: {
    term?: string;
    category?: string;
    isIrregular?: boolean;
  }): WordsParams {
    const query = params.term?.trim();
    return {
      page: 1,
      limit: 7,
      ...(query ? { keyword: query } : {}),
      ...(params.category ? { category: params.category } : {}),
      ...(params.category === 'verb'
        ? { isIrregular: params.isIrregular }
        : {}),
    };
  }

  loadStatistics() {
    this.wordsService.fetchStatistics().subscribe({
      next: (total) => this.toStudy.set(total.totalCount),
    });
  }

  searchWords = new FormGroup({
    term: new FormControl('', { nonNullable: true }),
    category: new FormControl('', { nonNullable: true }),
    isIrregular: new FormControl(false, { nonNullable: true }),
  });

  constructor() {
    this.isLoading.set(true);
    this.error.set(null);

    this.loadStatistics();

    this.wordsService.fetchCategories().subscribe({
      next: (category) => this.categories.set(category),
      error: () => this.error.set('Oops, something went wrong'),
    });

    this.searchWords.valueChanges
      .pipe(
        debounceTime(200),
        distinctUntilChanged((prev, curr) => {
          return (
            prev.term?.trim() === curr.term?.trim() &&
            prev.category === curr.category &&
            prev.isIrregular === curr.isIrregular
          );
        }),
        switchMap((filters) =>
          this.wordsService.fetchOwnWords(this.buildParams(filters)),
        ),
        takeUntilDestroyed(),
      )
      .pipe(catchError(() => EMPTY))
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
