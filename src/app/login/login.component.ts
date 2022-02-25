import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { UiService } from '../shared/services/ui.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  formErr: string
  constructor(
    private fb: FormBuilder, 
    private authService: AuthService ,
    private router:Router,
    public uiService: UiService,
    private title:Title,
    private meta: Meta,) { }

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],

    })


    this.title.setTitle('Jopify - Login')
    this.meta.addTags([{name: 'description', content: 'login page'}])
  }


  login(userData: any){
    
    if(this.loginForm.valid) {
      
      this.uiService.isLoading$.next(true)
      this.authService.login(userData).subscribe(data =>{

        this.loginForm.reset()
        this.formErr =""
        this.authService.isLoggedIn$.next(true)
        this.router.navigate(['/dashboard/stats'])
        this.uiService.isLoading$.next(false)

      }, 
      (err)=>{
        this.formErr = err.error.msg
        this.uiService.isLoading$.next(false)

      })

    }
  
  }

}
