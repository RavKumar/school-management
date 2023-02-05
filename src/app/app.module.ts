import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StudentComponent } from './components/student/student.component';
import { MarksComponent } from './components/marks/marks.component';
import { HeaderComponent } from './components/header/header.component';
import { StudentDialogComponent } from './dialogs/student-dialog/student-dialog.component';
import { MarksDialogComponent } from './dialogs/marks-dialog/marks-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentComponent,
    MarksComponent,
    HeaderComponent,
    StudentDialogComponent,
    MarksDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
