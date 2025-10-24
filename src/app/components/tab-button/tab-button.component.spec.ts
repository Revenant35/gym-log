import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabButtonComponent } from './tab-button.component';
import { provideRouter } from '@angular/router';
import { Dumbbell } from 'lucide-angular';

describe('TabButtonComponent', () => {
  let component: TabButtonComponent;
  let fixture: ComponentFixture<TabButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabButtonComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(TabButtonComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('route', '/test');
    fixture.componentRef.setInput('label', 'Test');
    fixture.componentRef.setInput('icon', Dumbbell);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
