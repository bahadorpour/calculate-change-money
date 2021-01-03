/**
 * Routing Module
 * Author: Mojdeh Bahadorpour
 * Company: ITQ
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ComingSoonComponent } from './components/coming-soon/coming-soon.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PaymentAmountComponent } from './components/payment-amount/payment-amount.component';
import { PayCashComponent } from './components/shared/pay-cash/pay-cash.component';
import { SaleComponent } from './components/shared/sale/sale.component';

export const routes: Routes = [
  { path: '', redirectTo: 'cash', pathMatch: 'full' },
  { path: 'cash', component: PayCashComponent },
  { path: 'comingSoon', component: ComingSoonComponent },
  { path: 'electronicCash', redirectTo: 'comingSoon', pathMatch: 'full' },
  { path: 'creditCard', redirectTo: 'comingSoon', pathMatch: 'full' },
  { path: 'voucher', redirectTo: 'comingSoon', pathMatch: 'full' },
  { path: 'others', redirectTo: 'comingSoon', pathMatch: 'full' },

  { path: '**', component: NotFoundComponent } // Wildcard route for a 404 page
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
