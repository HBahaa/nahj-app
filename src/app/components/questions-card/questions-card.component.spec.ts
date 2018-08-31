import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsCardComponent } from './questions-card.component';

describe('QuestionsCardComponent', () => {
  let component: QuestionsCardComponent;
  let fixture: ComponentFixture<QuestionsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionsCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
