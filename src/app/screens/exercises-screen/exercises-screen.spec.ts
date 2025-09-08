import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExercisesScreen } from './exercises-screen';

describe('ExercisesScreen', () => {
  let component: ExercisesScreen;
  let fixture: ComponentFixture<ExercisesScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExercisesScreen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExercisesScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
