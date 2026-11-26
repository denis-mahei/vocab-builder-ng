import { Component, input, output } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-pagination',
  styleUrl: './pagination.scss',
  templateUrl: './pagination.html',
})
export class Pagination {
  readonly page = input.required<number>()
  readonly totalPages = input.required<number>()
  readonly pageChange = output<number>()

}
