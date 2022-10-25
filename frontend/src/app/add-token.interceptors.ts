import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { RtlScrollAxisType } from '@angular/cdk/platform';

@Injectable()
export class AttachTokenInterceptor implements HttpInterceptor {
  constructor(private userService: UserService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.userService.userState.value.token;
    if (token) {
      const request_with_JWT = request.clone({
        headers: request.headers.set('Authorization', 'Bearer' + token),
      });
      return next.handle(request_with_JWT);
    } else {
      return next.handle(request);
    }
  }
}
