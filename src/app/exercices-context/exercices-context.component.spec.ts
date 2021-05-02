import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExercicesContextComponent } from './exercices-context.component';

describe('ExercicesContextComponent', () => {
  let component: ExercicesContextComponent;
  let fixture: ComponentFixture<ExercicesContextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExercicesContextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExercicesContextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
