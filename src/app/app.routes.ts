import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { RegisterOrderPage } from './pages/register-order-page/register-order-page';
import { BackofficePage } from './pages/backoffice-page/backoffice-page';

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
    path: 'backoffice',
    component: BackofficePage,
  },
];
