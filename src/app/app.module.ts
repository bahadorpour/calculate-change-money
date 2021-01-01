import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLock, faPlus, faSortAmountDown, faTh } from '@fortawesome/free-solid-svg-icons';
import { AppComponent } from './app.component';
import { PaymentAmountComponent } from './components/payment-amount/payment-amount.component';
import { SaleComponent } from './components/shared/sale/sale.component';
import { PayCashComponent } from './components/pay-cash/pay-cash.component';
import { NumericKeyboardComponent } from './components/shared/numeric-keyboard/numeric-keyboard.component';

@NgModule({
  declarations: [
    AppComponent,
    PaymentAmountComponent,
    SaleComponent,
    PayCashComponent,
    NumericKeyboardComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(iconLibrary: FaIconLibrary) {
    // Add an icon to the library for convenient access in other components
    iconLibrary.addIcons(faLock, faTh, faSortAmountDown, faPlus);;
  }

}
