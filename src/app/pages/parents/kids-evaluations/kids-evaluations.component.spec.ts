import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KidsEvaluationsComponent } from './kids-evaluations.component';

describe('KidsEvaluationsComponent', () => {
  let component: KidsEvaluationsComponent;
  let fixture: ComponentFixture<KidsEvaluationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KidsEvaluationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KidsEvaluationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
