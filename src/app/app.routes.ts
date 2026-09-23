import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { RegisterOrderPage } from './pages/register-order-page/register-order-page';
import { BackofficePage } from './pages/backoffice-page/backoffice-page';
import { OrderLookupPage } from './pages/order-lookup-page/order-lookup-page';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'register',
    component: RegisterOrderPage,
  },
  {
    path: 'order-lookup/:orderNumber',
    component: OrderLookupPage,
  },
  {
    path: 'backoffice',
    component: BackofficePage,
  },
];
