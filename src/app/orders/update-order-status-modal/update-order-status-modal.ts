import { Component, inject, signal } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { OrderStatusModalData } from '../order-status-modal-data';
import { BackofficeApiClient } from '../../backoffice-api-client';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';
import { OrderStatus } from '../order-status';
import { MatFormField, MatLabel } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatButton } from '@angular/material/button';
import { firstValueFrom } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  imports: [
    MatDialogContent,
    MatDialogTitle,
    FormRoot,
    MatFormField,
    FormField,
    FormsModule,
    MatSelect,
    MatOption,
    MatLabel,
    MatDialogActions,
    MatButton,
    MatProgressSpinner,
  ],
  selector: 'app-update-order-status-modal',
  templateUrl: './update-order-status-modal.html',
})
export class UpdateOrderStatusModal {
  protected readonly dialogRef = inject(MatDialogRef<UpdateOrderStatusModal>);
  protected readonly data = inject<OrderStatusModalData>(MAT_DIALOG_DATA);
  protected readonly backofficeApiClient = inject(BackofficeApiClient);
  protected readonly snackBar = inject(MatSnackBar);

  protected readonly updateOrderStatusModel = signal({
    orderStatus: this.data.currentStatus,
  });
  protected readonly updateOrderStatusForm = form(
    this.updateOrderStatusModel,
    (schemaPath) => {
      required(schemaPath.orderStatus);
    },
    {
      submission: {
        action: async (field) => {
          await firstValueFrom(
            this.backofficeApiClient.updateOrderStatus(this.data.id, field().value().orderStatus),
          )
            .then(() => {
              this.dialogRef.close(true);
            })
            .catch((error) => {
              console.error('Error updating order status', error);
              this.snackBar.open('Error updating order status', 'Close', { duration: 10000 });
              return;
            });
        },
      },
    },
  );
  protected readonly orderStatuses = Object.values(OrderStatus);
}
