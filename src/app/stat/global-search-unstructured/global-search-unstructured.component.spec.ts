import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalSearchUnstructuredComponent } from './global-search-unstructured.component';

describe('GlobalSearchUnstructuredComponent', () => {
  let component: GlobalSearchUnstructuredComponent;
  let fixture: ComponentFixture<GlobalSearchUnstructuredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalSearchUnstructuredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalSearchUnstructuredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
