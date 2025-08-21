import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';

import { catchError, from, switchMap, throwError } from 'rxjs';
import {AuthService} from './auth-service';

const PUBLIC_ENDPOINTS = ['/login', '/register'];


export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const authService = inject(AuthService);

  if (PUBLIC_ENDPOINTS.some(endpoint => req.url.includes(endpoint))) {
    return next(req);
  }


  const token = authService.token;
  const authReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(authReq).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        return from(authService.refresh()).pipe(
          switchMap((newToken) => {
            if (!newToken) return throwError(() => err);
            const retried = req.clone({ setHeaders: { Authorization: `Bearer ${newToken}` } });
            return next(retried);
          })
        );
      }
      return throwError(() => err);
    })
  );
};
