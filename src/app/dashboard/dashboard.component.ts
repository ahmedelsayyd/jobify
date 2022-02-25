import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, OnInit, PLATFORM_ID, Renderer2, ViewChild } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('content') content:ElementRef
  @ViewChild('sideBar') sideBar:ElementRef
  isActive:boolean= true
  isBrowser:boolean
 
  constructor(
    private authService: AuthService, 
    private render:Renderer2,
    private title:Title,
    private meta: Meta,
    @Inject(PLATFORM_ID) private platformId:object) { 
        this.isActive= isPlatformBrowser(platformId)
     }

  ngOnInit(): void {
    this.title.setTitle('Jopify - Dashboard')
    this.meta.addTags([{name: 'description', content: 'Dashboard'}])
    
  }
  
  ngAfterViewInit(): void {
    this.render.setStyle(this.content.nativeElement, 'paddingLeft', (this.sideBar.nativeElement.offsetWidth+35) + 'px')
    if(this.isBrowser){
      // this.toggoleSidebar()
    }
      
  }

  toggoleSidebar(){
    this.isActive = !this.isActive
    if(this.isActive){
      this.render.setStyle(this.content.nativeElement, 'paddingLeft', (this.sideBar.nativeElement.offsetWidth+35) + 'px')
      
    }else{
      this.render.setStyle(this.content.nativeElement, 'paddingLeft', 35+'px')
    }
  }

  logout(){
    this.authService.logout()
  }


}
