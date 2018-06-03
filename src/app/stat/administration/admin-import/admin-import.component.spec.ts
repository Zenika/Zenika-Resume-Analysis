import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminImportComponent } from './admin-import.component';

describe('AdminImportComponent', () => {
  let component: AdminImportComponent;
  let fixture: ComponentFixture<AdminImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminImportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
