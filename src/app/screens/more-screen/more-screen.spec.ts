import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreScreen } from './more-screen';

describe('MoreScreen', () => {
  let component: MoreScreen;
  let fixture: ComponentFixture<MoreScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoreScreen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoreScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
