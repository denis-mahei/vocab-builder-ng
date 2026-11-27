import { Component, computed, input, output } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-pagination',
  styleUrl: './pagination.scss',
  templateUrl: './pagination.html',
})
export class Pagination {
  readonly currPage = input.required<number>();
  readonly totalPages = input.required<number>();
  readonly pageChange = output<number>();
  readonly pages = computed(() =>
    Array.from({ length: this.totalPages() }, (_, i) => i + 1),
  );
}
