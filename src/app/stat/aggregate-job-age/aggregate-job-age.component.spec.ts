import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AggregateJobAgeComponent } from './aggregate-job-age.component';

describe('AggregateJobAgeComponent', () => {
  let component: AggregateJobAgeComponent;
  let fixture: ComponentFixture<AggregateJobAgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AggregateJobAgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AggregateJobAgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
