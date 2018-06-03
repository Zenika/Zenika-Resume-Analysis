œimport { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AggregateAnneeExpComponent } from './aggregateAnneeExp.component';

describe('AggregateAnneeExpComponent', () => {
  let component: AggregateAnneeExpComponent;
  let fixture: ComponentFixture<AggregateAnneeExpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AggregateAnneeExpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AggregateAnneeExpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
