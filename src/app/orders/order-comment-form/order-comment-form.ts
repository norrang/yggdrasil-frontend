import { Component, inject, input, output, signal } from '@angular/core';
import { AddCommentRequest } from '../add-comment-request';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';
import { MatError, MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatButton } from '@angular/material/button';
import { BackofficeApiClient } from '../../backoffice-api-client';
import { firstValueFrom } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

const EMPTY_FORM_MODEL: AddCommentRequest = {
  body: '',
  private: false,
};

@Component({
  imports: [
    FormRoot,
    MatFormField,
    MatLabel,
    MatInput,
    MatError,
    FormField,
    MatCheckbox,
    MatButton,
    MatProgressSpinner,
  ],
  selector: 'app-order-comment-form',
  styleUrl: './order-comment-form.css',
  templateUrl: './order-comment-form.html',
})
export class OrderCommentForm {
  orderId = input.required<string>();
  refresh = output<void>();

  private readonly backofficeApiClient = inject(BackofficeApiClient);
  private readonly snackBar = inject(MatSnackBar);
  protected commentModel = signal<AddCommentRequest>(EMPTY_FORM_MODEL);
  protected commentForm = form(
    this.commentModel,
    (schemaPath) => {
      required(schemaPath.body, { message: 'The comment cannot be empty' });
    },
    {
      submission: {
        action: async (field) => {
          await firstValueFrom(
            this.backofficeApiClient.postComment(
              this.orderId(),
              field().value().body,
              field().value().private,
            ),
          )
            .then(() => {
              this.refresh.emit();
              this.resetForm();
              return;
            })
            .catch((error) => {
              console.error('Error posting comment:', error);
              this.snackBar.open('Failed to post comment', 'Dismiss', { duration: 10000 });
              return;
            });
        },
      },
    },
  );

  protected resetForm() {
    this.commentForm().reset(EMPTY_FORM_MODEL);
  }
}
