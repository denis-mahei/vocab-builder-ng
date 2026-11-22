import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WordFields } from './word-fields';

describe('WordFields', () => {
  let component: WordFields;
  let fixture: ComponentFixture<WordFields>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordFields],
    }).compileComponents();

    fixture = TestBed.createComponent(WordFields);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
