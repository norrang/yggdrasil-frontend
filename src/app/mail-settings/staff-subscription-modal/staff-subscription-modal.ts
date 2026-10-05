import { Component, inject, signal } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { email, form, FormField, FormRoot, maxLength, required } from '@angular/forms/signals';
import { MatError, MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatButton } from '@angular/material/button';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { firstValueFrom } from 'rxjs';
import { BackofficeApiClient } from '../../backoffice-api-client';
import { StaffSubscriptionRequest } from '../staff-subscription-request';
import { StaffSubscriptionResponse } from '../staff-subscription-response';
import { AccountStore } from '../../auth/account-store';

@Component({
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    FormRoot,
    FormField,
    MatFormField,
    MatLabel,
    MatInput,
    MatError,
    MatCheckbox,
    MatButton,
    MatProgressSpinner,
  ],
  selector: 'app-staff-subscription-modal',
  styleUrl: './staff-subscription-modal.css',
  templateUrl: './staff-subscription-modal.html',
})
export class StaffSubscriptionModal {
  protected readonly dialogRef = inject(MatDialogRef<StaffSubscriptionModal>);
  protected readonly data = inject<StaffSubscriptionResponse | null>(MAT_DIALOG_DATA);
  private readonly backofficeApiClient = inject(BackofficeApiClient);
  private readonly snackBar = inject(MatSnackBar);
  private readonly accountStore = inject(AccountStore);

  protected readonly isEditing = this.data !== null;

  private readonly subscriptionModel = signal<StaffSubscriptionRequest>({
    email: this.data?.email ?? this.accountStore.email() ?? '',
    newOrders: this.data?.newOrders ?? true,
  });

  protected readonly subscriptionForm = form(
    this.subscriptionModel,
    (schemaPath) => {
      required(schemaPath.email, { message: 'Email is required' });
      email(schemaPath.email, { message: 'Enter a valid email address' });
      maxLength(schemaPath.email, 254, { message: 'Email must be less than 254 characters' });
    },
    {
      submission: {
        action: async (field) => {
          await firstValueFrom(
            this.backofficeApiClient.createOrReplaceUsersStaffEmailSubscription(field().value()),
          )
            .then(() => {
              this.dialogRef.close(true);
            })
            .catch((error) => {
              console.error('Error saving email subscription:', error);
              this.snackBar.open('Failed to save email subscription', 'Dismiss', {
                duration: 10000,
              });
              return;
            });
        },
      },
    },
  );
}
