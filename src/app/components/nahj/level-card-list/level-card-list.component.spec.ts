import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelCardListComponent } from './level-card-list.component';

describe('LevelCardListComponent', () => {
  let component: LevelCardListComponent;
  let fixture: ComponentFixture<LevelCardListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LevelCardListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
