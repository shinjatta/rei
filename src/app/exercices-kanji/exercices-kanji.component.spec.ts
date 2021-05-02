import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExercicesKanjiComponent } from './exercices-kanji.component';

describe('ExercicesKanjiComponent', () => {
  let component: ExercicesKanjiComponent;
  let fixture: ComponentFixture<ExercicesKanjiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExercicesKanjiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExercicesKanjiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
