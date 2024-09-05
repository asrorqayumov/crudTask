import { HttpRequest, HttpInterceptorFn, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { catchError, throwError } from 'rxjs';
import { SnackBarService } from '../services/snackbar.service';
import { SnackbarType } from '../models/Snackbar';

export const ErrorInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const snackbarService = inject(SnackBarService);

  return next(req).pipe(
    catchError((error: any) => {
      console.log(error);
   alert( error.statusText)
      // snackbarService.snackBar$.next({ message: error.statusText, cancelText: 'Okay', type: SnackbarType.ERROR });
      return throwError(() => error);
    })
  );
};
