import { Component, computed, inject, input, signal } from '@angular/core';
import { HttpErrorResponse, HttpResourceRef, HttpStatusCode } from '@angular/common/http';
import { JsonPipe } from '@angular/common';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs';
import { BackofficeApiClient } from '../../backoffice-api-client';
import { InfoBox } from '../../info-box/info-box';
import { StaffSubscriptionResponse } from '../staff-subscription-response';
import { StaffSubscriptionModal } from '../staff-subscription-modal/staff-subscription-modal';

@Component({
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatCardActions,
    MatButton,
    MatProgressSpinner,
    InfoBox,
    JsonPipe,
  ],
  selector: 'app-staff-subscription-card',
  styleUrl: './staff-subscription-card.css',
  templateUrl: './staff-subscription-card.html',
})
export class StaffSubscriptionCard {
  readonly subscription = input.required<HttpResourceRef<StaffSubscriptionResponse | undefined>>();

  private readonly backofficeApiClient = inject(BackofficeApiClient);
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);
  protected readonly isDisabling = signal(false);

  protected readonly subscriptionDetails = computed(() => {
    const subscription = this.subscription();
    return subscription.hasValue() ? subscription.value() : undefined;
  });

  // The backend responds with 404 when the user has no registered subscription.
  protected readonly isNotSubscribed = computed(() => {
    const error = this.subscription().error();
    return error instanceof HttpErrorResponse && error.status === HttpStatusCode.NotFound;
  });

  protected readonly otherError = computed(() =>
    this.isNotSubscribed() ? undefined : this.subscription().error(),
  );

  protected openSubscriptionModal(currentSubscription: StaffSubscriptionResponse | null) {
    this.dialog
      .open(StaffSubscriptionModal, {
        data: currentSubscription,
        width: '600px',
        disableClose: true,
      })
      .afterClosed()
      .subscribe({
        next: (shouldRefresh: boolean) => {
          if (shouldRefresh) {
            this.subscription().reload();
          }
        },
      });
  }

  protected disableSubscription() {
    this.isDisabling.set(true);
    this.backofficeApiClient
      .deleteUsersStaffEmailSubscription()
      .pipe(finalize(() => this.isDisabling.set(false)))
      .subscribe({
        next: () => {
          this.subscription().reload();
        },
        error: (error) => {
          console.error('Error disabling email subscription:', error);
          this.snackBar.open('Failed to disable email notifications', 'Dismiss', {
            duration: 10000,
          });
        },
      });
  }
}
