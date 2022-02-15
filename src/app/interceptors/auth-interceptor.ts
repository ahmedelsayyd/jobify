import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { AuthService } from "../shared/services/auth.service";


@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(private authService:AuthService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        if(req.url.startsWith(`${environment.apiUrl}/jobs`)){

            const authToken = this.authService.token? this.authService.token: ''
    
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${authToken}`
                },
            })
        }

        return next.handle(req)
    }



}