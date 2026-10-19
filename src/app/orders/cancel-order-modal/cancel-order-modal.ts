import { Component, inject, signal } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { form, FormField, FormRoot, maxLength } from '@angular/forms/signals';
import { MatError, MatFormField, MatHint, MatInput, MatLabel } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { CancelOrderModalData } from '../cancel-order-modal-data';
import { OrderLookupStore } from '../order-lookup-store';
import { OrderStatus } from '../order-status';

const MAX_REASON_LENGTH = 1000;

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
    MatHint,
    MatError,
    MatButton,
    MatProgressSpinner,
  ],
  selector: 'app-cancel-order-modal',
  styleUrl: './cancel-order-modal.css',
  templateUrl: './cancel-order-modal.html',
})
export class CancelOrderModal {
  protected readonly dialogRef = inject(MatDialogRef<CancelOrderModal>);
  protected readonly data = inject<CancelOrderModalData>(MAT_DIALOG_DATA);
  private readonly orderLookupStore = inject(OrderLookupStore);
  private readonly snackBar = inject(MatSnackBar);

  // A pending order is cancelled straight away, an order in progress only gets a cancellation request
  protected readonly isRequest = this.data.currentStatus === OrderStatus.IN_PROGRESS;
  protected readonly MAX_REASON_LENGTH = MAX_REASON_LENGTH;

  private readonly cancelOrderModel = signal({ reason: '' });

  protected readonly cancelOrderForm = form(
    this.cancelOrderModel,
    (schemaPath) => {
      maxLength(schemaPath.reason, MAX_REASON_LENGTH, {
        message: `The reason must be at most ${MAX_REASON_LENGTH} characters`,
      });
    },
    {
      submission: {
        action: async (field) => {
          const reason = field().value().reason.trim();

          await this.orderLookupStore
            .cancelOrder(this.data.orderNumber, reason ? { reason } : {})
            .then((orderDetails) => {
              const message =
                orderDetails.status === OrderStatus.CANCELLED
                  ? 'Your order has been cancelled'
                  : 'Your cancellation request has been sent';
              this.snackBar.open(message, 'Dismiss', { duration: 10000 });
              this.dialogRef.close(true);
            })
            .catch((error: HttpErrorResponse) => {
              console.error('Error cancelling order:', error);

              if (error.status === HttpStatusCode.Conflict) {
                // The order changed since it was loaded, so show the customer its current state
                this.orderLookupStore.lookupOrder(this.data.orderNumber).catch((lookupError) => {
                  console.error('Error looking up order:', lookupError);
                });
                this.snackBar.open(
                  'The order has changed and could not be cancelled. The latest order details have been loaded.',
                  'Dismiss',
                  { duration: 10000 },
                );
                this.dialogRef.close(false);
                return;
              }

              this.snackBar.open('Failed to cancel order', 'Dismiss', { duration: 10000 });
              return;
            });
        },
      },
    },
  );
}
