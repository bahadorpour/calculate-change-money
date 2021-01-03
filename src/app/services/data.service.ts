import { Injectable } from '@angular/core';
import { Button } from '../models/Button';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  checkoutButtons: Button[];

  constructor() {
    this.checkoutButtons = [
      {
        id: 1,
        route: 'cash',
        label: 'Bar'
      },
      {
        id: 2,
        route: 'electronicCash',
        label: 'EC'
      },
      {
        id: 3,
        route: 'creditCard',
        label: 'Kreditkarte'
      },
      {
        id: 4,
        route: 'voucher',
        label: 'gutschein'
      },
      {
        id: 5,
        route: 'others',
        label: 'Sonstige'
      }
    ];
  }

  /**
   * Return buttons data
   */
  getButtons(): Button[] {
    return this.checkoutButtons;
  }

}
