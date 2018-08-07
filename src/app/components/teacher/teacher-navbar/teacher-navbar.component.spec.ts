import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule } from '@angular/router';
import { TeacherNavbarComponent } from './teacher-navbar.component';

describe('TeacherNavbarComponent', () => {
  let component: TeacherNavbarComponent;
  let fixture: ComponentFixture<TeacherNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule
      ],
      declarations: [ TeacherNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
