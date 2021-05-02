import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExercicesListeningComponent } from './exercices-listening.component';

describe('ExercicesListeningComponent', () => {
  let component: ExercicesListeningComponent;
  let fixture: ComponentFixture<ExercicesListeningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExercicesListeningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExercicesListeningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
