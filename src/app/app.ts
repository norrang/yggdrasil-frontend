import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { finalize } from 'rxjs';
import { AccountStore } from './auth/account-store';
import { PageNavigation } from './page-navigation/page-navigation';

@Component({
  imports: [RouterOutlet, PageNavigation],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  private readonly oidcSecurityService = inject(OidcSecurityService);

  protected accountStore = inject(AccountStore);
  protected hasCheckedAuth = this.accountStore.hasCheckedAuth;
  protected isSignedIn = this.accountStore.isSignedIn;

  ngOnInit() {
    this.oidcSecurityService
      .checkAuth()
      .pipe(finalize(() => (this.accountStore.hasCheckedAuth = true)))
      .subscribe();
  }
}
