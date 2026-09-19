import { computed, inject, Service, Signal, signal } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Service()
export class AccountStore {
  private readonly oidcSecurityService = inject(OidcSecurityService);

  private _hasCheckedAuth = signal(false);
  private _signInState = computed(() => this.oidcSecurityService.authenticated().isAuthenticated);
  private _userName = computed(() => this.oidcSecurityService.userData()?.userData?.name);
  private _characterName = computed(
    () => this.oidcSecurityService.userData()?.userData?.valheim_character_name,
  );

  get hasCheckedAuth(): Signal<boolean> {
    return this._hasCheckedAuth.asReadonly();
  }

  set hasCheckedAuth(value: boolean) {
    this._hasCheckedAuth.set(value);
  }

  get isSignedIn() {
    return this._signInState;
  }

  get userName() {
    return this._userName;
  }

  get characterName() {
    return this._characterName;
  }
}
