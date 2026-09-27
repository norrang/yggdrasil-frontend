import { Component, inject, signal } from '@angular/core';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { ItemTypeForm } from '../item-type-form/item-type-form';
import { form, maxLength, required, submit } from '@angular/forms/signals';
import { BackofficeApiClient } from '../../backoffice-api-client';
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
  selector: 'app-create-item-type-modal',
  styleUrl: './create-item-type-modal.css',
  templateUrl: './create-item-type-modal.html',
})
export class CreateItemTypeModal {
  protected readonly dialogRef = inject(MatDialogRef<unknown>);
  private readonly snackBar = inject(MatSnackBar);
  private readonly backofficeApiClient = inject(BackofficeApiClient);
  private itemTypeModel = signal(EMPTY_FORM_MODEL);

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

  protected async createItemType() {
    await submit(this.itemTypeForm, async (field) => {
      await firstValueFrom(this.backofficeApiClient.createItemType(field().value()))
        .then(() => {
          this.dialogRef.close(true);
          return;
        })
        .catch((error) => {
          console.error('Error creating item type:', error);
          this.snackBar.open('Failed to create item type', 'Dismiss', { duration: 10000 });
          return;
        });
    });
  }
}
