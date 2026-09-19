import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { AccountStore } from '../auth/account-store';

@Component({
  imports: [RouterLink, MatButton],
  selector: 'app-page-navigation',
  styleUrl: './page-navigation.css',
  templateUrl: './page-navigation.html',
})
export class PageNavigation {
  private readonly oidcSecurityService = inject(OidcSecurityService);
  private readonly accountStore = inject(AccountStore);

  protected isSignedIn = this.accountStore.isSignedIn;

  protected signIn() {
    this.oidcSecurityService.authorize();
  }

  protected signOut() {
    this.oidcSecurityService.logoff();
  }
}
