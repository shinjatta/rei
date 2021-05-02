import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExercicesUsageComponent } from './exercices-usage.component';

describe('ExercicesUsageComponent', () => {
  let component: ExercicesUsageComponent;
  let fixture: ComponentFixture<ExercicesUsageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExercicesUsageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExercicesUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
