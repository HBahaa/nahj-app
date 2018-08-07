import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EvaluationDataComponent } from '../../../components/nahj/evaluation-data/evaluation-data.component';
import { EvaluationQuestionsComponent } from '../../../components/nahj/evaluation-questions/evaluation-questions.component';

import { EvaluationsComponent } from './evaluations.component';

describe('EvaluationsComponent', () => {
  let component: EvaluationsComponent;
  let fixture: ComponentFixture<EvaluationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluationDataComponent, EvaluationQuestionsComponent, EvaluationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
