import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLock, faPlus, faSortAmountDown, faTh } from '@fortawesome/free-solid-svg-icons';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ComingSoonComponent } from './components/coming-soon/coming-soon.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PaymentAmountComponent } from './components/payment-amount/payment-amount.component';
import { NumericKeyboardComponent } from './components/shared/numeric-keyboard/numeric-keyboard.component';
import { PayCashComponent } from './components/shared/pay-cash/pay-cash.component';
import { SaleComponent } from './components/shared/sale/sale.component';
import { SaleTabsComponent } from './components/sale-tabs/sale-tabs.component';

@NgModule({
  declarations: [
    AppComponent,
    PaymentAmountComponent,
    SaleComponent,
    PayCashComponent,
    NumericKeyboardComponent,
    CheckoutComponent,
    ComingSoonComponent,
    PageNotFoundComponent,
    SaleTabsComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  // register the dynamic components here
  entryComponents: [SaleComponent]
})
export class AppModule {
  constructor(iconLibrary: FaIconLibrary) {
    // Add an icon to the library for convenient access in other components
    iconLibrary.addIcons(faLock, faTh, faSortAmountDown, faPlus);
  }
}
