import { Component, input } from '@angular/core';
import { Word } from '../../models';

@Component({
  imports: [],
  selector: 'app-words-table',
  styleUrl: './words-table.scss',
  templateUrl: './words-table.html',
})
export class WordsTable {
  readonly words = input.required<Word[]>()

}
