import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

//import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    console.log("=========",req.url);
    console.log(req.url.indexOf('editCategory'));

    if (req.url.indexOf('addCategory') > -1 || req.url.indexOf('editCategory') > -1) {
      console.log("1111111111111");
      req = req.clone({
        setHeaders: {         
          'Authorization': `Bearer ${token}`,
        },
      });
    } else {
      console.log("222222222222222");
      req = req.clone({
        setHeaders: {
          'Content-Type' : 'application/json; charset=utf-8',
          'Accept'       : 'application/json, text/plain, */*',
          'Authorization': `Bearer ${token}`,
        },
      });
    }

    return next.handle(req);
  }
}