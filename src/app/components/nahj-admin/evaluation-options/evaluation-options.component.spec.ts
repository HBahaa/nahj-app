import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EvaluationOptionsComponent } from './evaluation-options.component';

describe('EvaluationOptionsComponent', () => {
  let component: EvaluationOptionsComponent;
  let fixture: ComponentFixture<EvaluationOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluationOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluationOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
