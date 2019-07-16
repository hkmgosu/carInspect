import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/timeout';

@Injectable()
export class TimeoutInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let req = request;
    const DEFAULT_TIMEOUT = 10000;
    return next.handle(req).timeout(DEFAULT_TIMEOUT);
  }
}