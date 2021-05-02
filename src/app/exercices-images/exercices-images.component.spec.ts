import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExercicesImagesComponent } from './exercices-images.component';

describe('ExercicesImagesComponent', () => {
  let component: ExercicesImagesComponent;
  let fixture: ComponentFixture<ExercicesImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExercicesImagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExercicesImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
