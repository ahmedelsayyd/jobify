import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Job } from '../models/job.model';
import { Jobs } from '../models/jobs.model';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  jobsCount$ = new BehaviorSubject<number>(0)
  pindingJobs$ = new BehaviorSubject<Job[]>([])
  interviewJobs$ = new BehaviorSubject<Job[]>([])
  declinedJobs$ = new BehaviorSubject<Job[]>([])

  isBrowser

  constructor(
    private http: HttpClient, 
    private authService: AuthService, 
    private userService:UserService,
    @Inject(PLATFORM_ID) private platformId:Object) { 
      this.isBrowser = isPlatformBrowser(platformId);
    }


  getAllJobs(){

    const userId = this.userService.currentUserId()
    return this.http.get<Jobs>(`${environment.apiUrl}/jobs`)
            .pipe(
              map(data =>{

                // data.jobs.filter(job => job.createdBy == userId)
                return data
              }))
  }


  createJob(jobData:Job){

    return this.http.post(`${environment.apiUrl}/jobs`, jobData)
  }

  getJob(id: string){

    return this.http.get<{job: Job}>(`${environment.apiUrl}/jobs/${id}`)
            .pipe( map(({job})=> job))
  }


  updateJob(id: string, jobData:Job){

    return this.http.patch<{job: Job}>(`${environment.apiUrl}/jobs/${id}`,jobData)
            .pipe(map(({job}) => job))
  }

  deleteJob(id: string){

    return this.http.delete(`${environment.apiUrl}/jobs/${id}`)
  }


  calculateJobsStats(data:Jobs){
    
    const pindingJobs = data.jobs.filter(job=> job.status ==='pending')
    const interviewJobs = data.jobs.filter(job=> job.status ==='interview')
    const declinedJobs = data.jobs.filter(job=> job.status ==='declined')

    this.jobsCount$.next(data.count)
    this.pindingJobs$.next(pindingJobs)
    this.declinedJobs$.next(declinedJobs)
    this.interviewJobs$.next(interviewJobs)
  }
}
