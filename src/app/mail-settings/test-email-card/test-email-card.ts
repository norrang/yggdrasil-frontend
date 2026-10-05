import { Component, inject, signal } from '@angular/core';
import { email, form, FormField, FormRoot, required } from '@angular/forms/signals';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { MatError, MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { firstValueFrom } from 'rxjs';
import { BackofficeApiClient } from '../../backoffice-api-client';
import { TestEmailRequest } from '../test-email-request';

@Component({
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    FormRoot,
    FormField,
    MatFormField,
    MatLabel,
    MatInput,
    MatError,
    MatButton,
    MatProgressSpinner,
  ],
  selector: 'app-test-email-card',
  styleUrl: './test-email-card.css',
  templateUrl: './test-email-card.html',
})
export class TestEmailCard {
  private readonly backofficeApiClient = inject(BackofficeApiClient);
  private readonly snackBar = inject(MatSnackBar);

  private readonly testEmailModel = signal<TestEmailRequest>({ to: '' });
  protected readonly testEmailForm = form(
    this.testEmailModel,
    (schemaPath) => {
      required(schemaPath.to, { message: 'Recipient is required' });
      email(schemaPath.to, { message: 'Enter a valid email address' });
    },
    {
      submission: {
        action: async (field) => {
          const request = field().value();
          await firstValueFrom(this.backofficeApiClient.sendTestEmail(request))
            .then(() => {
              this.snackBar.open(`Test email sent to ${request.to}`, 'Dismiss', {
                duration: 10000,
              });
            })
            .catch((error) => {
              console.error('Error sending test email:', error);
              this.snackBar.open('Failed to send test email', 'Dismiss', { duration: 10000 });
              return;
            });
        },
      },
    },
  );
}
