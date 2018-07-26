import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherEvaluationDataComponent } from './teacher-evaluation-data.component';

describe('TeacherEvaluationDataComponent', () => {
  let component: TeacherEvaluationDataComponent;
  let fixture: ComponentFixture<TeacherEvaluationDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherEvaluationDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherEvaluationDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
