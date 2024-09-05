import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';


export const AuthInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const authService = inject(AuthService);
  const user = authService.getUser();

  if (user && user.access_token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${user.access_token}`,
      },
    });

    return next(authReq);
  }

  return next(req);
};
