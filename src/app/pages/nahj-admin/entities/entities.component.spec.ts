import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from '../../../components/nahj-admin/card/card.component';
import { EntitiesComponent } from './entities.component';

describe('EntitiesComponent', () => {
  let component: EntitiesComponent;
  let fixture: ComponentFixture<EntitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardComponent, EntitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
