import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';


export interface AuthData{
  user: User
  token: string
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isBrowser
  isLoggedIn$ = new BehaviorSubject(false)

  constructor(
    private http: HttpClient, 
    private router: Router,
    @Inject(PLATFORM_ID) private platformId:Object) { 
      this.isBrowser = isPlatformBrowser(platformId);
    }


  register(userData:User){
    
    return this.http.post<AuthData>(`${environment.apiUrl}/auth/register`, userData)
    .pipe(
      map((data: AuthData)=>{
        if(this.isBrowser){

          if(data.token) localStorage.setItem('token', data.token)
          if(data.user) localStorage.setItem('user', JSON.stringify(data.user))
        }

        return data.user
      })
    )

  }

  login(userData:any){
    return this.http.post<AuthData>(`${environment.apiUrl}/auth/login`, userData)
    .pipe(
      map((data)=>{
        if(this.isBrowser){

          if(data.token) localStorage.setItem('token', data.token)
          if(data.user) localStorage.setItem('user', JSON.stringify(data.user))
        }
        return data.user

      })
    )
  }

  logout(){
    if(this.isBrowser){

      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
    this.isLoggedIn$.next(false)
    this.router.navigate(['/login'])
  }



  get token():any{
    if(this.isBrowser){

      return localStorage.getItem('token')
    }
  }

  get isLoggedIn(): boolean{
    return this.token ? true: false
  }


}
