import { Component } from '@angular/core';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';

@Component({
  imports: [MatFormField, MatLabel, MatInput],
  selector: 'app-register-order-form',
  styleUrl: './register-order-form.css',
  templateUrl: './register-order-form.html',
})
export class RegisterOrderForm {}
