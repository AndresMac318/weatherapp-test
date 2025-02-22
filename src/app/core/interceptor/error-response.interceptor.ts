import type { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const ErrorResponseInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) =>
  next(req).pipe(catchError(handleErrorResponse))

function handleErrorResponse(error: HttpErrorResponse){
  console.log('Error', error);
  const errorResponse = `Error ${error.status}, message: ${error.message}`;
  return throwError(() => errorResponse);
}