import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatHistoNbAnneeExpComponent } from './stat-histo-nb-annee-exp.component';

describe('StatHistoNbAnneeExpComponent', () => {
  let component: StatHistoNbAnneeExpComponent;
  let fixture: ComponentFixture<StatHistoNbAnneeExpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatHistoNbAnneeExpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatHistoNbAnneeExpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
