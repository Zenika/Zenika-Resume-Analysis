import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloudWordComponent } from './cloud-word.component';

describe('CloudWordComponent', () => {
  let component: CloudWordComponent;
  let fixture: ComponentFixture<CloudWordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloudWordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloudWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
