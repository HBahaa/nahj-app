import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LevelFilterComponent } from '../level-filter/level-filter.component';

import { EvaluationQuestionsComponent } from './evaluation-questions.component';

describe('EvaluationQuestionsComponent', () => {
  let component: EvaluationQuestionsComponent;
  let fixture: ComponentFixture<EvaluationQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LevelFilterComponent, EvaluationQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluationQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
