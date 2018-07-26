import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LevelCardComponent } from '../../../components/nahj-admin/level-card/level-card.component';
import { LevelsComponent } from './levels.component';

describe('LevelsComponent', () => {
  let component: LevelsComponent;
  let fixture: ComponentFixture<LevelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LevelCardComponent, LevelsComponent ]
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
