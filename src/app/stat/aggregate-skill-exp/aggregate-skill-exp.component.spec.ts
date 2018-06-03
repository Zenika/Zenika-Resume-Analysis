import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AggregateSkillExpComponent } from './aggregate-skill-exp.component';

describe('AggregateSkillExpComponent', () => {
  let component: AggregateSkillExpComponent;
  let fixture: ComponentFixture<AggregateSkillExpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AggregateSkillExpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AggregateSkillExpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
