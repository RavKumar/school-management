import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { MarksComponent } from './components/marks/marks.component';
import { StudentComponent } from './components/student/student.component';

const routes: Routes = [
  { path: 'student', component: StudentComponent },
  { path: 'marks', component: MarksComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
