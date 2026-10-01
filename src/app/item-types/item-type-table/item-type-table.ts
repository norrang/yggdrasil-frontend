import { Component, inject, input, output } from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatNoDataRow,
  MatRow,
  MatRowDef,
  MatTable,
} from '@angular/material/table';
import { ItemTypeResponse } from '../item-type-response';
import { MatDialog } from '@angular/material/dialog';
import { UpdateItemTypeModal } from '../update-item-type-modal/update-item-type-modal';

@Component({
  imports: [
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
    MatNoDataRow,
  ],
  selector: 'app-item-type-table',
  templateUrl: './item-type-table.html',
})
export class ItemTypeTable {
  readonly itemTypes = input.required<ItemTypeResponse[]>();
  readonly refreshItemTypes = output<void>();
  protected displayedColumns = ['name', 'imageUrl', 'quantityType', 'enabled'];

  private readonly dialog = inject(MatDialog);

  openUpdateItemTypeModal(id: string) {
    this.dialog
      .open(UpdateItemTypeModal, {
        data: id,
        width: '800px',
        disableClose: true,
      })
      .afterClosed()
      .subscribe({
        next: (shouldRefresh: boolean) => {
          if (shouldRefresh) {
            this.refreshItemTypes.emit();
          }
        },
      });
  }
}
