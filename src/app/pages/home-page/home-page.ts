import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { MatError, MatFormField, MatHint, MatInput, MatLabel } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatDivider, MatListItem, MatNavList } from '@angular/material/list';
import { Router, RouterLink } from '@angular/router';
import { form, FormField, FormRoot, maxLength, required } from '@angular/forms/signals';
import { OrderLookupStore } from '../../orders/order-lookup-store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { PreviousOrderNumbersStore } from '../../orders/previous-order-numbers-store';

@Component({
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    MatButton,
    MatHint,
    MatDivider,
    RouterLink,
    FormRoot,
    FormField,
    MatError,
    MatNavList,
    MatListItem,
  ],
  selector: 'app-home-page',
  styleUrl: './home-page.css',
  templateUrl: './home-page.html',
})
export class HomePage implements OnInit {
  protected readonly orderLookupStore = inject(OrderLookupStore);
  protected readonly previousOrderNumbersStore = inject(PreviousOrderNumbersStore);
  protected readonly snackBar = inject(MatSnackBar);
  protected readonly router = inject(Router);
  protected readonly previousOrderNumbers = signal<string[] | null>(null);
  protected readonly shownPreviousOrderNumbers = computed(() => {
    const previousOrderNumbers = this.previousOrderNumbers();
    if (!previousOrderNumbers) {
      return null;
    }

    return previousOrderNumbers.length > 0 ? previousOrderNumbers : null;
  });

  ngOnInit() {
    this.previousOrderNumbers.set(this.previousOrderNumbersStore.getStoredOrderNumbers());
  }

  protected lookupModel = signal({
    orderNumber: '',
  });
  protected lookupForm = form(
    this.lookupModel,
    (schemaPath) => {
      required(schemaPath.orderNumber, { message: 'Order number is required' });
      maxLength(schemaPath.orderNumber, 9, { message: 'Order number must be 9 characters' });
    },
    {
      submission: {
        action: async (field) => {
          const orderNumber = field().value().orderNumber;
          return await this.orderLookupStore
            .lookupOrder(orderNumber)
            .then(() => {
              this.router.navigate(['/order-lookup/', field().value().orderNumber]);
              return;
            })
            .catch((err: HttpErrorResponse) => {
              if (err.status === HttpStatusCode.NotFound) {
                return {
                  kind: 'notFound',
                  message: 'Order number not found',
                  fieldTree: field.orderNumber,
                };
              }

              console.error('Order lookup error', err);
              this.snackBar.open('Order lookup error', 'Dismiss', { duration: 10000 });
              return;
            });
        },
      },
    },
  );
}
