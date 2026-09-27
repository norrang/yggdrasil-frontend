import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { RegisterOrderPage } from './pages/register-order-page/register-order-page';
import { BackofficePage } from './pages/backoffice-page/backoffice-page';
import { OrderLookupPage } from './pages/order-lookup-page/order-lookup-page';
import { BackofficeLandingPage } from './pages/backoffice-page/backoffice-landing-page/backoffice-landing-page';
import { ManageItemsPage } from './pages/backoffice-page/manage-items-page/manage-items-page';
import { ManageOrdersPage } from './pages/backoffice-page/manage-orders-page/manage-orders-page';
import { BackofficeOrderDetailsPage } from './pages/backoffice-page/manage-orders-page/backoffice-order-details-page/backoffice-order-details-page';

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
    children: [
      {
        path: '',
        component: BackofficeLandingPage,
      },
      {
        path: 'manage-orders',
        component: ManageOrdersPage,
      },
      {
        path: 'manage-items',
        component: ManageItemsPage,
      },
    ],
  },
  {
    path: 'backoffice/manage-orders/:id',
    component: BackofficeOrderDetailsPage,
  },
];
