import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, map, switchMap } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { JobService } from 'src/app/shared/services/job.service';
import { UiService } from 'src/app/shared/services/ui.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {
  formErr: string
  isUpdated$ = new BehaviorSubject(false)


  mode: string = 'create'

  jopForm: FormGroup = this.fb.group({
    position: ['', Validators.required],
    company: ['', Validators.required],
    location: ['', Validators.required],
    status: ['', Validators.required],
    jobType: ['', Validators.required],

  })

  jobId: string


  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private fb: FormBuilder, 
    public uiService:UiService,
    private jobService:JobService) {

    // this.checkFormMode()

   }

  ngOnInit(): void {

    this.jobId = this.route.snapshot.params['id']

    if(this.jobId) {
      this.mode ="update"
      this.uiService.isLoading$.next(true)
      this.jobService.getJob(this.jobId).subscribe(job=>{
         this.jopForm.patchValue(job)
        this.uiService.isLoading$.next(false)
      } , (err)=>{
        this.formErr= err.error.msg
        this.uiService.isLoading$.next(false)
      })

    }else{
      this.mode ="create"
    }
    
  }

  addOrUpdateJob(jobData: any){

    if(this.jobId){

      
      if(this.jopForm.valid && this.jopForm.dirty){

        this.uiService.isLoading$.next(true)
        this.jobService.updateJob(this.jobId ,jobData).subscribe(job =>{
          this.jopForm.patchValue(job)
          this.uiService.isLoading$.next(false)
          this.updatedState()
          this.formErr =''

        }, (err)=>{
          this.formErr= err.error.msg
          this.uiService.isLoading$.next(false)
        })
      }else{
        this.formErr = 'please fill the full form'
      }

    }else{

      if(this.jopForm.valid && this.jopForm.dirty){
        this.uiService.isLoading$.next(true)
        this.jobService.createJob(jobData).subscribe(job =>{
          
          this.uiService.isLoading$.next(false)
          this.updatedState()
          this.formErr =''

        }, (err)=>{
          console.log(err);
          
          this.formErr= err.error.msg
          this.uiService.isLoading$.next(false)
        })
      }else{
        this.formErr = 'please fill the full form'
      }
    }
  }


  updatedState(){
    this.isUpdated$.next(true)
    setTimeout(()=>{
      this.isUpdated$.next(false)
    },2000)
  }

  resetForm(){
    this.jopForm.reset()
  }

}
