import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseSearchScreen } from './exercise-search-screen';

describe('ExerciseScreen', () => {
  let component: ExerciseSearchScreen;
  let fixture: ComponentFixture<ExerciseSearchScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciseSearchScreen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExerciseSearchScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
