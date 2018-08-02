import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { EntitiesComponent } from './pages/nahj/entities/entities.component';
import { HomeComponent } from './pages/nahj/home/home.component';
import { DataComponent } from './pages/nahj/data/data.component';
import { LevelsComponent } from './pages/nahj/levels/levels.component';
import { EvaluationsComponent } from './pages/nahj/evaluations/evaluations.component';

import { ProfileComponent } from './pages/teacher/profile/profile.component';
import { StudentsComponent } from './pages/teacher/students/students.component';
import { TeacherEvaluationDataComponent } from './pages/teacher/teacher-evaluation-data/teacher-evaluation-data.component';
import { TeacherEvaluationsComponent } from './pages/teacher/teacher-evaluations/teacher-evaluations.component';

import { TeachersComponent } from './pages/school/teachers/teachers.component';
import { ParentsComponent } from './pages/school/parents/parents.component';
import { SchoolDataComponent } from './pages/school/school-data/school-data.component';
import { ChildernComponent } from './pages/school/childern/childern.component';

const routes: Routes = [
	{path: 'login', component: LoginComponent},
	{path: 'entities', component: EntitiesComponent},
	{path: 'data', component: DataComponent},
	{path: 'levels', component: LevelsComponent},
	{path: 'evaluations', component: EvaluationsComponent},
	{path: '', pathMatch: 'full', component: HomeComponent},
	{
    path: 'nahj',
    children: [
      {
        path: 'entities',
        component: EntitiesComponent
      },
      {
        path: 'data',
        component: DataComponent
      },
      {
        path: 'levels',
        component: LevelsComponent
      },
      {
        path: 'evaluations',
        component: EvaluationsComponent
      }
      ,
      {
        path: '',
        pathMatch: 'full',
        component: HomeComponent
      }
    ]
  },
  {
    path: 'teacher',
    children: [
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'students',
        component: StudentsComponent
      },
      {
        path: 'evaluations',
        component: TeacherEvaluationsComponent
      },
      {
        path: 'evaluation-data',
        component: TeacherEvaluationDataComponent
      }
    ]
  },
  {
    path: 'school',
    children: [
      {
        path: 'data',
        component: SchoolDataComponent
      },
      {
        path: 'children',
        component: ChildernComponent
      },
      {
        path: 'parents',
        component: ParentsComponent
      },
      {
        path: 'teachers',
        component: TeachersComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
