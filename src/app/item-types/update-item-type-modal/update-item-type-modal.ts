import { Component, inject, linkedSignal, signal } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { ItemTypeForm } from '../item-type-form/item-type-form';
import { form, maxLength, required, submit } from '@angular/forms/signals';
import { BackofficeApiClient } from '../../backoffice-api-client';
import { ItemTypeResponse } from '../item-type-response';
import { CreateOrUpdateItemTypeRequest } from '../create-or-update-item-type-request';
import { finalize, firstValueFrom } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { HttpStatusCode } from '@angular/common/http';

const EMPTY_FORM_MODEL: CreateOrUpdateItemTypeRequest = {
  name: '',
  imageUrl: '',
  quantityType: '',
  enabled: true,
};

@Component({
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    ItemTypeForm,
    MatProgressSpinner,
  ],
  selector: 'app-update-item-type-modal',
  styleUrl: './update-item-type-modal.css',
  templateUrl: './update-item-type-modal.html',
})
export class UpdateItemTypeModal {
  protected readonly dialogRef = inject(MatDialogRef<unknown>);
  protected readonly data = inject<string>(MAT_DIALOG_DATA);

  private readonly snackBar = inject(MatSnackBar);
  private readonly backofficeApiClient = inject(BackofficeApiClient);
  protected isDeletingItemType = signal(false);
  protected itemTypeDetails = this.backofficeApiClient.getItemTypeById(this.data);

  private itemTypeModel = linkedSignal<ItemTypeResponse | undefined, CreateOrUpdateItemTypeRequest>(
    {
      source: this.itemTypeDetails.value,
      computation: (response) => (response ? { ...response } : EMPTY_FORM_MODEL),
    },
  );

  protected itemTypeForm = form(this.itemTypeModel, (schemaPath) => {
    required(schemaPath.name, { message: 'Name is required' });
    maxLength(schemaPath.name, 100, { message: 'Name must be less than 100 characters' });
    required(schemaPath.imageUrl, { message: 'Image URL is required' });
    maxLength(schemaPath.imageUrl, 500, { message: 'Image URL must be less than 500 characters' });
    required(schemaPath.quantityType, { message: 'Quantity type is required' });
    maxLength(schemaPath.quantityType, 50, {
      message: 'Quantity type must be less than 50 characters',
    });
  });

  protected async updateItemType() {
    await submit(this.itemTypeForm, async (field) => {
      await firstValueFrom(this.backofficeApiClient.updateItemType(this.data, field().value()))
        .then(() => {
          this.dialogRef.close(true);
          return;
        })
        .catch((error) => {
          console.error('Error updating item type:', error);
          this.snackBar.open('Failed to update item type', 'Dismiss', { duration: 10000 });
          return;
        });
    });
  }

  protected deleteItemType() {
    this.isDeletingItemType.set(true);
    this.backofficeApiClient
      .deleteItemType(this.data)
      .pipe(finalize(() => this.isDeletingItemType.set(false)))
      .subscribe({
        next: () => {
          this.dialogRef.close(true);
        },
        error: (error) => {
          if (error.status === HttpStatusCode.Conflict) {
            this.snackBar.open(
              'This item type cannot be deleted since it is currently associated with one or more orders.',
              'Dismiss',
              {
                duration: 10000,
              },
            );
            return;
          }

          console.error('Error deleting item type:', error);
          this.snackBar.open('Failed to delete item type', 'Dismiss', { duration: 10000 });
        },
      });
  }
}
