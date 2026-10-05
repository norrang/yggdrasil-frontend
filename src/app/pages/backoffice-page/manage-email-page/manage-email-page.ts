import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { BackofficeApiClient } from '../../../backoffice-api-client';
import { StaffSubscriptionCard } from '../../../mail-settings/staff-subscription-card/staff-subscription-card';
import { TestEmailCard } from '../../../mail-settings/test-email-card/test-email-card';

@Component({
  imports: [MatIcon, MatIconButton, StaffSubscriptionCard, TestEmailCard],
  selector: 'app-manage-email-page',
  styleUrl: './manage-email-page.css',
  templateUrl: './manage-email-page.html',
})
export default class ManageEmailPage {
  private readonly backofficeApiClient = inject(BackofficeApiClient);
  protected readonly subscription = this.backofficeApiClient.getUsersStaffEmailSubscription();

  protected refreshSubscription() {
    this.subscription.reload();
  }
}
