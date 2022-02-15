import { NgModule } from '@angular/core';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { JobComponent } from './job/job.component';
import { JobsComponent } from './jobs/jobs.component';
import { StatsComponent } from './stats/stats.component';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';


@NgModule({
  declarations: [
    DashboardComponent,
    JobComponent,
    JobsComponent,
    StatsComponent,
    ProfileComponent
  ],
  imports: [
    DashboardRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    FormsModule,
  ],
  exports: [JobComponent]
})
export class DashboardModule { }
