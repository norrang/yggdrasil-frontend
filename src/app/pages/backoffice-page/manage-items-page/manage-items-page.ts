import { Component, inject } from '@angular/core';
import { ItemTypeTable } from '../../../item-types/item-type-table/item-type-table';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { BackofficeApiClient } from '../../../backoffice-api-client';
import { JsonPipe } from '@angular/common';

@Component({
  imports: [ItemTypeTable, MatIcon, MatIconButton, MatProgressSpinner, JsonPipe],
  selector: 'app-manage-items-page',
  styleUrl: './manage-items-page.css',
  templateUrl: './manage-items-page.html',
})
export class ManageItemsPage {
  protected readonly backofficeApiClient = inject(BackofficeApiClient);
  protected readonly itemTypes = this.backofficeApiClient.getItemTypes();

  protected refreshItemTypes() {
    this.itemTypes.reload();
  }
}
