import { Component, inject, signal } from '@angular/core';
import { Words } from './words';
import { Word, WordsParams, WordsResponse } from '../models';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  EMPTY,
  finalize,
  map,
  merge,
  Observable,
  startWith,
  Subject,
  switchMap,
  tap,
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
  private readonly reload$ = new Subject<void>();
  private readonly wordsService = inject(Words);
  private readonly dialog = inject(Dialog);
  readonly words = signal<Word[]>([]);
  readonly categories = signal<string[]>([]);
  readonly toStudy = signal<number>(0);
  isLoading = signal(true);
  error = signal<string | null>(null);
  readonly searchWords = new FormGroup({
    term: new FormControl('', { nonNullable: true }),
    category: new FormControl('', { nonNullable: true }),
    isIrregular: new FormControl(false, { nonNullable: true }),
  });

  loadStatistics() {
    this.wordsService.fetchStatistics().subscribe({
      next: (total) => this.toStudy.set(total.totalCount),
    });
  }

  addWordDialog(): void {
    const dialogRef = this.dialog.open(AddWordModal, {
      panelClass: 'add-word-modal-pane',
      ariaLabelledBy: 'add-word-dialog-title',
      data: {
        categories: this.categories(),
      },
    });
    dialogRef.closed.subscribe((result) => {
      if (!result) return;
      this.loadStatistics();
      this.reload$.next();
    });
  }

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
  constructor() {
    this.loadStatistics();
    
    this.wordsService.fetchCategories().subscribe({
      next: (category) => this.categories.set(category),
      error: () => this.error.set('Oops, something went wrong'),
    });

    const filters$ = this.searchWords.valueChanges.pipe(
      debounceTime(200),
      distinctUntilChanged((prev, curr) => {
        return (
          prev.term?.trim() === curr.term?.trim() &&
          prev.category === curr.category &&
          prev.isIrregular === curr.isIrregular
        );
      }),
    );
    const refreshed$ = this.reload$.pipe(
      map(() => this.searchWords.getRawValue()),
    );
    merge(filters$, refreshed$)
      .pipe(
        startWith(this.searchWords.getRawValue()),
        map((filters): WordsParams => this.buildParams(filters)),
        tap(() => this.error.set(null)),
        switchMap((params): Observable<WordsResponse> =>
          this.wordsService.fetchOwnWords(params).pipe(
            catchError(() => {
              this.error.set('Oops, something went wrong');
              return EMPTY;
            }),
            finalize(() => this.isLoading.set(false)),
          ),
        ),
        takeUntilDestroyed(),
      )
      .subscribe(({ results }: { results: Word[] }) => this.words.set(results));
  }
}
