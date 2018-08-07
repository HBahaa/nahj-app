import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutComponent } from './layout.component';
import { NahjNavbarComponent } from '../nahj/nahj-navbar/nahj-navbar.component';
import { SchoolNavbarComponent } from '../school/school-navbar/school-navbar.component';
import { TeacherNavbarComponent } from '../teacher/teacher-navbar/teacher-navbar.component';
import { ParentsNavbarComponent } from '../parents/parents-navbar/parents-navbar.component';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
      LayoutComponent,
      NahjNavbarComponent,
      SchoolNavbarComponent,
      ParentsNavbarComponent,
      TeacherNavbarComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
