import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { catchError, finalize, of } from 'rxjs';
import { AccountStore } from './auth/account-store';
import { PageNavigation } from './page-navigation/page-navigation';

@Component({
  imports: [RouterOutlet, PageNavigation],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {
  private readonly oidcSecurityService = inject(OidcSecurityService);

  protected accountStore = inject(AccountStore);
  protected hasCheckedAuth = this.accountStore.hasCheckedAuth;
  protected isSignedIn = this.accountStore.isSignedIn;

  ngOnInit() {
    // Tries to refresh the session with the refresh token if the stored tokens have expired.
    // If that fails, the stale tokens are cleared so they are not sent with API requests.
    this.oidcSecurityService
      .checkAuthIncludingServer()
      .pipe(
        catchError(() => of(null)),
        finalize(() => (this.accountStore.hasCheckedAuth = true)),
      )
      .subscribe((response) => {
        if (!response?.isAuthenticated) {
          this.oidcSecurityService.logoffLocal();
        }
      });
  }
}
