import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isLoggedIn$: Observable<boolean>= this.authService.isLoggedIn$

  constructor(
    private authService: AuthService,
    private title:Title,
    private meta: Meta,) { }

  ngOnInit(): void {
    this.title.setTitle('Jopify - Home')
    this.meta.addTag({name: 'description', content: 'find poper job in america can be though.'})
  }

  logout(){
    this.authService.logout()
  }

}
