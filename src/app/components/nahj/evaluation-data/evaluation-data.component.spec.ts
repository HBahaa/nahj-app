import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EvaluationDataComponent } from './evaluation-data.component';
import { LevelFilterComponent } from '../../../components/nahj/level-filter/level-filter.component';

describe('EvaluationDataComponent', () => {
  let component: EvaluationDataComponent;
  let fixture: ComponentFixture<EvaluationDataComponent>;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, FormsModule ],
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
