import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMultiCriteriasComponent } from './search-multi-criterias.component';

describe('SearchMultiCriteriasComponent', () => {
  let component: SearchMultiCriteriasComponent;
  let fixture: ComponentFixture<SearchMultiCriteriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchMultiCriteriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchMultiCriteriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
