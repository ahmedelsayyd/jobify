import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { UiService } from 'src/app/shared/services/ui.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user:any
  userForm: FormGroup
  formErr: string
  isUpdated$ = new BehaviorSubject(false)
  isBrowser

  constructor(
    private fb: FormBuilder, 
    public uiService:UiService, 
    private userService:UserService,
    private title:Title,
    private meta: Meta,
    @Inject(PLATFORM_ID) private platformId:Object) { 
      this.isBrowser = isPlatformBrowser(platformId);
    }

  ngOnInit(): void {

    this.userForm = this.fb.group({
      name: this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
      }),
      country: ['', Validators.required],
      email: ['', Validators.required],

    })

    this.user = this.userService.getUser()
    this.userForm.patchValue(this.user)  
      

    this.title.setTitle('Jopify - Profile')
    this.meta.addTags([{name: 'description', content: 'user profile'}])
    
  }



  updateUser(userData: any){


    if(this.userForm.valid && this.userForm.dirty) {

      
      this.uiService.isLoading$.next(true)
      this.userService.updateUser(userData).subscribe((data: User) =>{

        this.user = data
        this.userForm.patchValue(data)
        this.formErr =""
        this.uiService.isLoading$.next(false)
        this.updatedState()
        
      }, (err)=>{
        this.formErr = err.error.msg
        this.uiService.isLoading$.next(false)

      })
    }
  }


  updatedState(){
    this.isUpdated$.next(true)
    if(this.isBrowser){

      setTimeout(()=>{
        this.isUpdated$.next(false)
      },2000)
    }
  }
}
