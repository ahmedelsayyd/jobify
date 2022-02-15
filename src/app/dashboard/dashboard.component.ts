import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
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
  isActive= false
 
  constructor(private authService: AuthService, private render:Renderer2) {  }

  ngOnInit(): void {
    
  }
  
  ngAfterViewInit(): void {
    this.toggoleSidebar()
      
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
