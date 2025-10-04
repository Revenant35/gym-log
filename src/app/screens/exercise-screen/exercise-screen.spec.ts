import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseScreen } from './exercise-screen';

describe('ExerciseScreen', () => {
  let component: ExerciseScreen;
  let fixture: ComponentFixture<ExerciseScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciseScreen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExerciseScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
