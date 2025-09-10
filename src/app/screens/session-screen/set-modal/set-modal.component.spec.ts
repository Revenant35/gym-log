import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetModalComponent } from './set-modal.component';

describe('SetModal', () => {
  let component: SetModalComponent;
  let fixture: ComponentFixture<SetModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
