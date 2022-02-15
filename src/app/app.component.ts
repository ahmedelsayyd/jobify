import { Component } from '@angular/core';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'jobs';

  constructor(private authService: AuthService){
    
    if(this.authService.isLoggedIn) this.authService.isLoggedIn$.next(true)
  }
}
