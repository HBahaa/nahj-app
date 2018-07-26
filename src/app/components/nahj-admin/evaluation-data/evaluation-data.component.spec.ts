import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LevelFilterComponent } from '../level-filter/level-filter.component';
import { EvaluationDataComponent } from './evaluation-data.component';

describe('EvaluationDataComponent', () => {
  let component: EvaluationDataComponent;
  let fixture: ComponentFixture<EvaluationDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LevelFilterComponent, EvaluationDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluationDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
