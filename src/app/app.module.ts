import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
import { DataComponent } from './pages/nahj-admin/data/data.component';
import { LevelsComponent } from './pages/nahj-admin/levels/levels.component';
import { HomeComponent } from './pages/nahj-admin/home/home.component';
import { EntitiesComponent } from './pages/nahj-admin/entities/entities.component';
import { EvaluationsComponent } from './pages/nahj-admin/evaluations/evaluations.component';
import { LoginComponent } from './pages/login/login.component';

import { EvaluationDataComponent } from './components/nahj-admin/evaluation-data/evaluation-data.component';
import { EvaluationOptionsComponent } from './components/nahj-admin/evaluation-options/evaluation-options.component';
import { EvaluationQuestionsComponent } from './components/nahj-admin/evaluation-questions/evaluation-questions.component';
import { NavbarComponent } from './components/nahj-admin/navbar/navbar.component';
import { LevelCardComponent } from './components/nahj-admin/level-card/level-card.component';
import { LevelFilterComponent } from './components/nahj-admin/level-filter/level-filter.component';
import { SchoolFilterComponent } from './components/nahj-admin/school-filter/school-filter.component';
import { CardComponent } from './components/nahj-admin/card/card.component';
import { LayoutComponent } from './components/layout/layout.component';

/*************** servicers ****************/
import { AuthService } from './services/auth/auth.service';
import { TeacherNavbarComponent } from './components/teacher/teacher-navbar/teacher-navbar.component';
import { ProfileComponent } from './pages/teacher/profile/profile.component';
import { StudentsComponent } from './pages/teacher/students/students.component';
import { TeacherEvaluationDataComponent } from './pages/teacher/teacher-evaluation-data/teacher-evaluation-data.component';
import { TeacherEvaluationsComponent } from './pages/teacher/teacher-evaluations/teacher-evaluations.component';
import { ClassFilterComponent } from './components/teacher/class-filter/class-filter.component';


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
    NavbarComponent,
    LevelCardComponent,
    LevelFilterComponent,
    SchoolFilterComponent,
    CardComponent,
    LayoutComponent,
    LoginComponent,
    TeacherNavbarComponent,
    ProfileComponent,
    StudentsComponent,
    TeacherEvaluationDataComponent,
    TeacherEvaluationsComponent,
    ClassFilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }