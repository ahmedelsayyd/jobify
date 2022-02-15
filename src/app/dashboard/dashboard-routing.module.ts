import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/services/auth-guard.guard';
import { DashboardComponent } from './dashboard.component';
import { JobComponent } from './job/job.component';
import { JobsComponent } from './jobs/jobs.component';
import { ProfileComponent } from './profile/profile.component';
import { StatsComponent } from './stats/stats.component';

const routes: Routes = [
  {path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard] ,children:[

    {path: "stats", component: StatsComponent},
    {path: "jobs", component: JobsComponent},
    {path: "job/add", component: JobComponent},
    {path: "job/:id", component: JobComponent},
    {path: "profile", component: ProfileComponent},
  ]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
