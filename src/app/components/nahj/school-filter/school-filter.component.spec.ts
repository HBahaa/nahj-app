import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolFilterComponent } from './school-filter.component';

describe('SchoolFilterComponent', () => {
  let component: SchoolFilterComponent;
  let fixture: ComponentFixture<SchoolFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
