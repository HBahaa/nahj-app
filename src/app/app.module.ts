import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/************* Najh Admin *************/
import { DataComponent } from './pages/nahj/data/data.component';
import { LevelsComponent } from './pages/nahj/levels/levels.component';
import { HomeComponent } from './pages/nahj/home/home.component';
import { EntitiesComponent } from './pages/nahj/entities/entities.component';
import { EvaluationsComponent } from './pages/nahj/evaluations/evaluations.component';
import { LoginComponent } from './pages/login/login.component';

import { EvaluationDataComponent } from './components/nahj/evaluation-data/evaluation-data.component';
import { EvaluationOptionsComponent } from './components/nahj/evaluation-options/evaluation-options.component';
import { EvaluationQuestionsComponent } from './components/nahj/evaluation-questions/evaluation-questions.component';
import { NahjNavbarComponent } from './components/nahj/nahj-navbar/nahj-navbar.component';
import { LevelFilterComponent } from './components/nahj/level-filter/level-filter.component';
import { SchoolFilterComponent } from './components/nahj/school-filter/school-filter.component';
import { LayoutComponent } from './components/layout/layout.component';

/*************** servicers ****************/
import { AuthService } from './services/auth/auth.service';
import { TeacherNavbarComponent } from './components/teacher/teacher-navbar/teacher-navbar.component';
import { ProfileComponent } from './pages/teacher/profile/profile.component';
import { StudentsComponent } from './pages/teacher/students/students.component';
import { TeacherEvaluationDataComponent } from './pages/teacher/teacher-evaluation-data/teacher-evaluation-data.component';
import { TeacherEvaluationsComponent } from './pages/teacher/teacher-evaluations/teacher-evaluations.component';
import { ClassFilterComponent } from './components/teacher/class-filter/class-filter.component';

import { HttpClientModule } from '@angular/common/http';

import { TeachersComponent } from './pages/school/teachers/teachers.component';
import { ParentsComponent } from './pages/school/parents/parents.component';
import { SchoolDataComponent } from './pages/school/school-data/school-data.component';
import { ChildernComponent } from './pages/school/childern/childern.component';
import { SchoolNavbarComponent } from './components/school/school-navbar/school-navbar.component';
import { CardListComponent } from './components/card-list/card-list.component';
import { LevelCardListComponent } from './components/nahj/level-card-list/level-card-list.component';
import { ParentProfileComponent } from './pages/parents/parent-profile/parent-profile.component';
import { KidsComponent } from './pages/parents/kids/kids.component';
import { KidsEvaluationsComponent } from './pages/parents/kids-evaluations/kids-evaluations.component';
import { ParentsNavbarComponent } from './components/parents/parents-navbar/parents-navbar.component';
import { LevelCardComponent } from './components/school/level-card/level-card.component';
import { StudentsFilterComponent } from './components/school/students-filter/students-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    DataComponent,
    LevelsComponent,
    HomeComponent,
    EntitiesComponent,
    EvaluationsComponent,
    EvaluationDataComponent,
    EvaluationOptionsComponent,
    EvaluationQuestionsComponent,
    NahjNavbarComponent,
    LevelFilterComponent,
    SchoolFilterComponent,
    LayoutComponent,
    LoginComponent,
    TeacherNavbarComponent,
    ProfileComponent,
    StudentsComponent,
    TeacherEvaluationDataComponent,
    TeacherEvaluationsComponent,
    ClassFilterComponent,
    TeachersComponent,
    ParentsComponent,
    SchoolDataComponent,
    ChildernComponent,
    SchoolNavbarComponent,
    CardListComponent,
    LevelCardListComponent,
    ParentProfileComponent,
    KidsComponent,
    KidsEvaluationsComponent,
    ParentsNavbarComponent,
    LevelCardComponent,
    StudentsFilterComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    HttpClientModule
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
