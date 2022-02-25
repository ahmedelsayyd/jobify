import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { UiService } from '../shared/services/ui.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup
  formErr:string

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService, 
    private router:Router,
    public uiService: UiService,
    private title:Title,
    private meta: Meta,
    ) { }

  ngOnInit(): void {

    this.registerForm = this.fb.group({
      name: this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
      }),
      country: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],

    })


    this.title.setTitle('Jopify - Register')
    this.meta.addTags([{name: 'description', content: 'create a new acount'}])
  }


  register(userData: any){

    if(this.registerForm.valid) {

      this.uiService.isLoading$.next(true)
      this.authService.register(userData).subscribe(data =>{

        this.registerForm.reset()
        this.formErr =""
        this.authService.isLoggedIn$.next(false)
        this.router.navigate(['/dashboard/stats'])

      }, (err)=>{
        this.formErr = err.error.msg
        this.authService.isLoggedIn$.next(false)

      })
    }
  }

}
