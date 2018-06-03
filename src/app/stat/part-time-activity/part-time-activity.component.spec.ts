import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartTimeActivityComponent } from './part-time-activity.component';

describe('PartTimeActivityComponent', () => {
  let component: PartTimeActivityComponent;
  let fixture: ComponentFixture<PartTimeActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartTimeActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartTimeActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
