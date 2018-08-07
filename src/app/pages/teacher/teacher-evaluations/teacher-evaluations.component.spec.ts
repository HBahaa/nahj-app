import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherEvaluationsComponent } from './teacher-evaluations.component';
import { ClassFilterComponent } from '../../../components/teacher/class-filter/class-filter.component';
import { LevelFilterComponent } from '../../../components/nahj/level-filter/level-filter.component';

describe('TeacherEvaluationsComponent', () => {
  let component: TeacherEvaluationsComponent;
  let fixture: ComponentFixture<TeacherEvaluationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherEvaluationsComponent , ClassFilterComponent, LevelFilterComponent]
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
