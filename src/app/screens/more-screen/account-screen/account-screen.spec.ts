import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountScreen } from './account-screen';

describe('AccountScreen', () => {
  let component: AccountScreen;
  let fixture: ComponentFixture<AccountScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountScreen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
