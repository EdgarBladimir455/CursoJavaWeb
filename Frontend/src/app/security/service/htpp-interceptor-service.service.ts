
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HtppInterceptorService implements HttpInterceptor {

  constructor(private router: Router,
              private authService: AuthenticationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log(0);

    if (sessionStorage.getItem('username') && sessionStorage.getItem('token')) {
      req = req.clone({
        setHeaders: {
          Authorization: sessionStorage.getItem('token')
        }
      });
    }

    return next.handle(req).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
        console.log(event);
      }
    }, (err: any) => {
      console.log(err);
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          this.authService.logOut();
        }
      }
    }));
  }
}
