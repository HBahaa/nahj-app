import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TeacherEvaluationDataComponent } from './teacher-evaluation-data.component';
import { ClassFilterComponent } from '../../../components/teacher/class-filter/class-filter.component';

describe('TeacherEvaluationDataComponent', () => {
  let component: TeacherEvaluationDataComponent;
  let fixture: ComponentFixture<TeacherEvaluationDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, FormsModule ],
      declarations: [ TeacherEvaluationDataComponent, ClassFilterComponent ]
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
