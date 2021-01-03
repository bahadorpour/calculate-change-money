/**
 * Routing Module
 * Author: Mojdeh Bahadorpour
 * Company: ITQ
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommingSoonComponent } from './components/comming-soon/comming-soon.component';
import { PaymentAmountComponent } from './components/payment-amount/payment-amount.component';
import { PayCashComponent } from './components/shared/pay-cash/pay-cash.component';

export const routes: Routes = [
  { path: '', component: PaymentAmountComponent },
  { path: 'payCash', component: PayCashComponent },
  { path: 'commingSoon', component: CommingSoonComponent },

  { path: '**', redirectTo: 'error', pathMatch: 'full' } // Wildcard route for a 404 page
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }