import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { authConfig } from './auth/auth.config';
import { AbstractSecurityStorage, authInterceptor, provideAuth } from 'angular-auth-oidc-client';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { LocalStorage } from './auth/local-storage';
import { unauthorizedInterceptor } from './auth/unauthorized-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([authInterceptor(), unauthorizedInterceptor])),
    provideAuth(authConfig),
    { provide: AbstractSecurityStorage, useClass: LocalStorage },
  ],
};
