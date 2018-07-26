import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherEvaluationsComponent } from './teacher-evaluations.component';

describe('TeacherEvaluationsComponent', () => {
  let component: TeacherEvaluationsComponent;
  let fixture: ComponentFixture<TeacherEvaluationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherEvaluationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherEvaluationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
