import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardListComponent } from '../../../components/card-list/card-list.component';
import { SchoolDataComponent } from './school-data.component';

describe('SchoolDataComponent', () => {
  let component: SchoolDataComponent;
  let fixture: ComponentFixture<SchoolDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, FormsModule ],
      declarations: [ SchoolDataComponent, CardListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
