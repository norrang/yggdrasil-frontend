import { HttpErrorResponse, HttpInterceptorFn, HttpStatusCode } from '@angular/common/http';
import { inject } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

// Clears locally stored tokens when the API rejects them, e.g. if they were revoked server-side.
export const unauthorizedInterceptor: HttpInterceptorFn = (req, next) => {
  const oidcSecurityService = inject(OidcSecurityService);

  return next(req).pipe(
    catchError((error: unknown) => {
      if (
        error instanceof HttpErrorResponse &&
        error.status === HttpStatusCode.Unauthorized &&
        req.url.startsWith(environment.apiBaseUri)
      ) {
        oidcSecurityService.logoffLocal();
      }
      return throwError(() => error);
    }),
  );
};
