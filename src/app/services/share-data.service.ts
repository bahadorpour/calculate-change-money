/**
 * ShareDataService: To share data between components without any relationships.
 * This service ensures that the component always receives the most recent data
 * Author: Mojdeh Bahadorpour
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  // Behavior Subject: 0 is an initial value. if there is a subscription after this, it would get 0 value immediately
  private totalCostSource = new BehaviorSubject<number>(0);
  currentTotalCost = this.totalCostSource.asObservable(); // get an observable from behavior subject

  private numKeyboardSource = new BehaviorSubject<number>(0);
  currentKeyboardInput = this.numKeyboardSource.asObservable();


  private cashSource = new BehaviorSubject<number>(0);
  currentCash = this.cashSource.asObservable();

  constructor() { }

  /**
   * Send totalCost to an observable using next() method
   * @param totalCost total cost
   */
  updateTotalCost(totalCost: number) {
    this.totalCostSource.next(totalCost);
  }

  /**
   * Send numeric keyboard value to an observable using next() method
   * @param input keyboard input
   */
  updateNumKeyboards(input: number) {
    this.numKeyboardSource.next(input);
  }

  /**
   * Send numeric keyboard value to an observable using next() method
   * @param cash keyboard input
   */
  updateCash(cash: number) {
    this.cashSource.next(cash);
  }

  /**
   * format numbers to  currency format
   * German uses comma as decimal separator and period for thousands
   * @param number given number
   * @returns A string with a language-sensitive representation of the given number
   */
  convertNumToEuro(num: number): string {
    return new Intl.NumberFormat(
      'de-DE',
      {
        style: 'currency',
        currency: 'EUR'
      }
    ).format(num)
  }
}
