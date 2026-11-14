import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WordsTable } from './words-table';

describe('WordsTable', () => {
  let component: WordsTable;
  let fixture: ComponentFixture<WordsTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordsTable],
    }).compileComponents();

    fixture = TestBed.createComponent(WordsTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
