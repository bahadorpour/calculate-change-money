import { Component, ViewChild } from '@angular/core';
import { SaleTabsComponent } from '../sale-tabs/sale-tabs.component';

@Component({
  selector: 'app-payment-amount',
  templateUrl: './payment-amount.component.html',
  styleUrls: ['./payment-amount.component.css']
})
export class PaymentAmountComponent {

  @ViewChild(SaleTabsComponent, { static: false }) tabsComponent;
  @ViewChild('personEdit', { static: false }) editPersonTemplate;

  constructor() { }

  onAddPerson() {
    this.tabsComponent.openTab('New Person', this.editPersonTemplate, {}, true);
  }
}
