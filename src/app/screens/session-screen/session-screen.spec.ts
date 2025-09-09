import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionScreen } from './session-screen';

describe('SessionScreen', () => {
  let component: SessionScreen;
  let fixture: ComponentFixture<SessionScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionScreen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
