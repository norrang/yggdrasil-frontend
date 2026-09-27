import { Component, input } from '@angular/core';
import { FieldTree, FormField, FormRoot } from '@angular/forms/signals';
import { CreateOrUpdateItemTypeRequest } from '../create-or-update-item-type-request';
import { MatError, MatFormField, MatHint, MatInput, MatLabel } from '@angular/material/input';
import { MatCheckbox } from '@angular/material/checkbox';
import { InfoBox } from '../../info-box/info-box';

@Component({
  imports: [
    FormRoot,
    MatFormField,
    MatLabel,
    FormField,
    MatHint,
    MatCheckbox,
    MatInput,
    InfoBox,
    MatError,
  ],
  selector: 'app-item-type-form',
  styleUrl: './item-type-form.css',
  templateUrl: './item-type-form.html',
})
export class ItemTypeForm {
  itemTypeForm = input.required<FieldTree<CreateOrUpdateItemTypeRequest>>();
}
