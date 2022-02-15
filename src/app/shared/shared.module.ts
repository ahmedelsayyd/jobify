import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { JobFormComponent } from './components/job-form/job-form.component';
import { HttpClientModule } from '@angular/common/http';
import { SpinnerComponent } from './components/spinner/spinner.component';



@NgModule({
  declarations: [
    JobFormComponent,
    AuthFormComponent,
    SpinnerComponent,
  ],
  
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [ JobFormComponent, AuthFormComponent, CommonModule, SpinnerComponent]
})
export class SharedModule { }
