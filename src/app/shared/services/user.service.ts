import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  saveUser(){

  }

  getUser(): User{
    return JSON.parse(localStorage.getItem('user') || '{}')
  }

  updateUser(userData: Partial<User>){
    
    return this.http.patch<User>(`${environment.apiUrl}/auth/user/${this.currentUserId()}`, userData)
    .pipe(
      tap(data=>{ localStorage.setItem('user', JSON.stringify(data))})
    )
  }

  currentUserId(){
    const user =JSON.parse(localStorage.getItem('user') || '{}')
    return user ? user.id : null
  }

  get userFullName(){    
    return `${this.getUser().name.firstName} ${this.getUser().name.lastName}`
    
  }
}
