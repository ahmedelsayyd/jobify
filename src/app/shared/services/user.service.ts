import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isBrowser
  
  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId:Object) {

      this.isBrowser = isPlatformBrowser(platformId);
     }

  saveUser(){

  }

  getUser():any{
    if(this.isBrowser){
      return JSON.parse(localStorage.getItem('user') || '{}')
    }
  }

  updateUser(userData: Partial<User>){
    
    return this.http.patch<User>(`${environment.apiUrl}/auth/user/${this.currentUserId()}`, userData)
    .pipe(
      tap(data=>{ 
        if(this.isBrowser){
          localStorage.setItem('user', JSON.stringify(data))
        }
      })
    )
  }

  currentUserId(){
    if(this.isBrowser){
      const user =JSON.parse(localStorage.getItem('user') || '{}')
      return user ? user.id : null
    }
  }

  get userFullName():any{ 
    if(this.isBrowser){
      return `${this.getUser().name.firstName} ${this.getUser().name.lastName}`
    }
    
  }
}
