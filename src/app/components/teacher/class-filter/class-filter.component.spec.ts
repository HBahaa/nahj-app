import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassFilterComponent } from './class-filter.component';

describe('ClassFilterComponent', () => {
  let component: ClassFilterComponent;
  let fixture: ComponentFixture<ClassFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
