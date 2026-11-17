import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterWords } from './filter-words';

describe('FilterWords', () => {
  let component: FilterWords;
  let fixture: ComponentFixture<FilterWords>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterWords],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterWords);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
