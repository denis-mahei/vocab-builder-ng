import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddWordModal } from './add-word-modal';

describe('AddWordModal', () => {
  let component: AddWordModal;
  let fixture: ComponentFixture<AddWordModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddWordModal],
    }).compileComponents();

    fixture = TestBed.createComponent(AddWordModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
