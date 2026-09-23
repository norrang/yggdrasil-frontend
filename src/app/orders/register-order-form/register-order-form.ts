import { Component, inject, linkedSignal, output } from '@angular/core';
import {
  MatError,
  MatFormField,
  MatHint,
  MatInput,
  MatLabel,
  MatSuffix,
} from '@angular/material/input';
import { PublicItemTypeStore } from '../../item-types/public-item-type-store';
import { NgOptimizedImage } from '@angular/common';
import {
  applyEach,
  email,
  form,
  FormField,
  FormRoot,
  min,
  required,
  validate,
} from '@angular/forms/signals';
import { PublicItemTypeResponse } from '../../item-types/public-item-type-response';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { CreateOrderRequest } from '../create-order-request';
import { firstValueFrom } from 'rxjs';
import { PublicApiClient } from '../../public-api-client';
import { RegisterOrderStateStore } from '../register-order-state-store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PreviousOrderNumbersStore } from '../previous-order-numbers-store';

interface OrderModel {
  customerName: string;
  customerEmail: string;
  characterName: string;
  dropOffLocation: string;
  customerNote: string;
  lines: OrderModelLine[];
}

interface OrderModelLine extends PublicItemTypeResponse {
  quantity: number | null;
}

@Component({
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    NgOptimizedImage,
    FormField,
    MatSuffix,
    MatError,
    MatCard,
    MatCardContent,
    MatProgressSpinner,
    MatButton,
    RouterLink,
    FormRoot,
    MatHint,
  ],
  selector: 'app-register-order-form',
  styleUrl: './register-order-form.css',
  templateUrl: './register-order-form.html',
})
export class RegisterOrderForm {
  moveToResultView = output<void>();

  protected readonly itemTypesResource = inject(PublicItemTypeStore).itemTypesResource;
  protected readonly publicApiClient = inject(PublicApiClient);
  protected readonly registerOrderStateStore = inject(RegisterOrderStateStore);
  protected readonly previousOrderNumbersStore = inject(PreviousOrderNumbersStore);
  protected readonly matSnackBar = inject(MatSnackBar);

  protected orderModel = linkedSignal<PublicItemTypeResponse[] | undefined, OrderModel>({
    source: this.itemTypesResource.value,
    computation: (itemsTypes, previous) => ({
      customerName: '',
      customerEmail: '',
      characterName: '',
      dropOffLocation: '',
      customerNote: '',
      lines: itemsTypes ? itemsTypes.map((itemType) => ({ ...itemType, quantity: null })) : [],
    }),
  });

  protected orderForm = form(
    this.orderModel,
    (schemaPath) => {
      required(schemaPath.customerName, { message: 'Customer name is required' });
      required(schemaPath.characterName, { message: 'Character name is required' });
      required(schemaPath.dropOffLocation, { message: 'Drop off location is required' });
      email(schemaPath.customerEmail, { message: 'A valid email address is required' });

      validate(schemaPath.lines, ({ value }) => {
        if (!value().find((lineItem) => lineItem.quantity && lineItem.quantity > 0)) {
          return {
            kind: 'itemType',
            message: 'At least one item is required',
          };
        }

        return null;
      });
      applyEach(schemaPath.lines, (lineItem) => {
        min(lineItem.quantity, 0, { message: 'Quantity needs to be a positive number' });
      });
    },
    {
      submission: {
        action: async (field) => {
          try {
            const orderResponse = await firstValueFrom(
              this.publicApiClient.placeOrder(this.orderModelToCreateOrderRequest(field().value())),
            );
            this.registerOrderStateStore.lastOrderResult = orderResponse;
            this.previousOrderNumbersStore.storeOrderNumber(orderResponse.orderNumber);
            this.moveToResultView.emit();
            return;
          } catch (error) {
            this.matSnackBar.open('Failed to register order', 'Close', { duration: 10000 });
            return;
          }
        },
      },
    },
  );

  orderModelToCreateOrderRequest(orderModel: OrderModel): CreateOrderRequest {
    return {
      ...orderModel,
      lines: orderModel.lines
        .filter((line) => line.quantity !== null)
        .map((line) => ({ itemTypeId: line.id, quantity: line.quantity as number })),
    };
  }
}
