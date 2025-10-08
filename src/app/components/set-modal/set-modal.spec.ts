import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetModal } from './set-modal';

describe('SetModal', () => {
  let component: SetModal;
  let fixture: ComponentFixture<SetModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
