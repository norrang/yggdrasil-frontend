import { Component, inject, linkedSignal } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { ItemTypeForm } from '../item-type-form/item-type-form';
import { form, required, submit } from '@angular/forms/signals';
import { BackofficeApiClient } from '../../backoffice-api-client';
import { ItemTypeResponse } from '../item-type-response';
import { CreateOrUpdateItemTypeRequest } from '../create-or-update-item-type-request';
import { firstValueFrom } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

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
  protected itemTypeDetails = this.backofficeApiClient.getItemTypeById(this.data);
  private itemTypeModel = linkedSignal<ItemTypeResponse | undefined, CreateOrUpdateItemTypeRequest>(
    {
      source: this.itemTypeDetails.value,
      computation: (response) => (response ? { ...response } : EMPTY_FORM_MODEL),
    },
  );

  protected itemTypeForm = form(this.itemTypeModel, (schemaPath) => {
    required(schemaPath.name, { message: 'Name is required' });
    required(schemaPath.imageUrl, { message: 'Image URL is required' });
    required(schemaPath.quantityType, { message: 'Quantity type is required' });
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
}
