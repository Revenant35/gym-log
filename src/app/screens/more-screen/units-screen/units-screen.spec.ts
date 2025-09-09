import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitsScreen } from './units-screen';

describe('UnitsScreen', () => {
  let component: UnitsScreen;
  let fixture: ComponentFixture<UnitsScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnitsScreen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnitsScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
