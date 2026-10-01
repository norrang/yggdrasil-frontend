import { Component, inject } from '@angular/core';
import { ItemTypeTable } from '../../../item-types/item-type-table/item-type-table';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { BackofficeApiClient } from '../../../backoffice-api-client';
import { JsonPipe } from '@angular/common';
import { InfoBox } from '../../../info-box/info-box';
import { MatDialog } from '@angular/material/dialog';
import { CreateItemTypeModal } from '../../../item-types/create-item-type-modal/create-item-type-modal';

@Component({
  imports: [ItemTypeTable, MatIcon, MatIconButton, MatProgressSpinner, JsonPipe, InfoBox],
  selector: 'app-manage-items-page',
  templateUrl: './manage-items-page.html',
})
export default class ManageItemsPage {
  protected readonly backofficeApiClient = inject(BackofficeApiClient);
  protected readonly itemTypes = this.backofficeApiClient.getItemTypes();
  private readonly dialog = inject(MatDialog);

  protected refreshItemTypes() {
    this.itemTypes.reload();
  }

  protected openCreateItemTypeModal() {
    this.dialog
      .open(CreateItemTypeModal, {
        width: '800px',
        disableClose: true,
      })
      .afterClosed()
      .subscribe({
        next: (shouldRefresh: boolean) => {
          if (shouldRefresh) {
            this.refreshItemTypes();
          }
        },
      });
  }
}
