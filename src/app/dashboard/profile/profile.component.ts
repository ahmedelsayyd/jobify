import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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

  user:User
  userForm: FormGroup
  formErr: string
  isUpdated$ = new BehaviorSubject(false)

  constructor(
    private fb: FormBuilder, 
    public uiService:UiService, 
    private userService:UserService) { }

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
    setTimeout(()=>{
      this.isUpdated$.next(false)
    },3000)
  }
}
