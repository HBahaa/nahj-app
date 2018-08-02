import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EvaluationDataComponent } from '../../../components/nahj-admin/evaluation-data/evaluation-data.component';
import { EvaluationOptionsComponent } from '../../../components/nahj-admin/evaluation-options/evaluation-options.component';
import { EvaluationQuestionsComponent } from '../../../components/nahj-admin/evaluation-questions/evaluation-questions.component';

import { EvaluationsComponent } from './evaluations.component';

describe('EvaluationsComponent', () => {
  let component: EvaluationsComponent;
  let fixture: ComponentFixture<EvaluationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluationDataComponent, EvaluationOptionsComponent, EvaluationQuestionsComponent,  EvaluationsComponent ]
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
