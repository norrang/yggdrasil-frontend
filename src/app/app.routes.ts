import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { BackofficeOrderDetailsPage } from './pages/backoffice-page/manage-orders-page/backoffice-order-details-page/backoffice-order-details-page';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register-order-page/register-order-page'),
  },
  {
    path: 'order-lookup/:orderNumber',
    loadComponent: () => import('./pages/order-lookup-page/order-lookup-page'),
  },
  {
    path: 'backoffice',
    loadComponent: () => import('./pages/backoffice-page/backoffice-page'),
    children: [
      {
        path: '',
        redirectTo: 'manage-orders',
        pathMatch: 'full',
      },
      {
        path: 'manage-orders',
        loadComponent: () =>
          import('./pages/backoffice-page/manage-orders-page/manage-orders-page'),
      },
      {
        path: 'manage-items',
        loadComponent: () => import('./pages/backoffice-page/manage-items-page/manage-items-page'),
      },
    ],
  },
  {
    path: 'backoffice/manage-orders/:id',
    component: BackofficeOrderDetailsPage,
  },
];
