import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LevelCardListComponent } from '../../../components/nahj/level-card-list/level-card-list.component';
import { LevelsComponent } from './levels.component';

describe('LevelsComponent', () => {
  let component: LevelsComponent;
  let fixture: ComponentFixture<LevelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LevelCardListComponent, LevelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
