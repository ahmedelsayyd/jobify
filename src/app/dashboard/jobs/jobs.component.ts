import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Job } from 'src/app/shared/models/job.model';
import { Jobs } from 'src/app/shared/models/jobs.model';
import { JobService } from 'src/app/shared/services/job.service';
import { UiService } from 'src/app/shared/services/ui.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {
  @ViewChild('cardMenu') cardMenu:ElementRef
  jobs : Job[]
  menuState ={
    isOpen: false,
    id: ''
  }

  constructor(
    private jobService:JobService, 
    private router: Router, 
    public uiService: UiService,
    public userService:UserService) { }

  ngOnInit(): void {

    this.loadData()
  }

  loadData(){
    this.uiService.isLoading$.next(true)
    this.jobService.getAllJobs().subscribe((data: Jobs)=>{
      
      this.jobs = data.jobs
      this.uiService.isLoading$.next(false)
      
    },(err)=>{
      console.log(err);
      this.uiService.isLoading$.next(false)

    })
  }

  toUpdateJob(id: string){    
    this.router.navigate(['/dashboard/job/', id])
  }

  deleteJob(id: string){
    this.jobService.deleteJob(id).subscribe()
    this.loadData()
  }


  formatDate(date: string){
    return new Date(date).toLocaleDateString()
  }


  textFirstLetter(text:string){
    return text.substring(0,1).toUpperCase()
  }

  toggoleMenu(){
    this.cardMenu.nativeElement
  }

}
