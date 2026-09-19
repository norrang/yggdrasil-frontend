import { Component } from '@angular/core';
import { RegisterOrderForm } from '../../orders/register-order-form/register-order-form';

@Component({
  imports: [RegisterOrderForm],
  selector: 'app-register-order-page',
  styleUrl: './register-order-page.css',
  templateUrl: './register-order-page.html',
})
export class RegisterOrderPage {}
