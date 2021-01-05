import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShareDataService } from 'src/app/services/share-data.service';
import Swal from 'sweetalert2';
import { NumericKeyboardComponent } from '../numeric-keyboard/numeric-keyboard.component';

@Component({
  selector: 'app-pay-cash',
  templateUrl: './pay-cash.component.html',
  styleUrls: ['./pay-cash.component.css']
})
export class PayCashComponent implements OnInit, OnDestroy {
  totalCost: number;
  cash: number;

  paymentButtons: number[];
  eruoPymentButtons: string[];
  private subscription: Subscription = new Subscription();
  @ViewChild(NumericKeyboardComponent, { static: false }) private numericKeyboardComponent: NumericKeyboardComponent;

  constructor(private shareDataService: ShareDataService) {
    this.paymentButtons = [];
    this.eruoPymentButtons = [];
  }

  ngOnInit() {
    this.subscribeTotalCost();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  /**
   * Receive total cost from sale component
   */
  private subscribeTotalCost() {
    this.subscription.add(
      this.shareDataService.currentTotalCost.subscribe(
        totalCost => {
          this.totalCost = totalCost;
          this.calculateAmounts(totalCost);
          this.convertNumsToEuro(this.paymentButtons);
        }
      )
    );
  }

  /**
   * create suggested amouts for buttons according to totalCost
   * @param num totalCost
   */
  private calculateAmounts(num: number) {
    this.paymentButtons[4] = num;
    this.paymentButtons[3] = (num !== Math.ceil(num)) ? Math.ceil(num) : num + 1;
    this.paymentButtons[2] = (10 - (this.paymentButtons[3] % 10)) + this.paymentButtons[3];
    this.paymentButtons[1] = this.paymentButtons[2] * 2;
    this.paymentButtons[0] = (10 ** ((this.paymentButtons[1] + '').length));
  }

  /**
   * format numbers of buttons as currency string
   * @param nums float number
   */
  private convertNumsToEuro(nums: number[]): void {
    this.eruoPymentButtons = [];
    nums.forEach(element => {
      this.eruoPymentButtons.push(this.shareDataService.convertNumToEuro(element));
    });
  }

  /**
   * Functionality of selected button
   */
  selectedButton(value: string, index: number) {
    this.shareDataService.floatCash = this.paymentButtons[index];
    this.shareDataService.updateCash(value);
    this.numericKeyboardComponent.keyboard.setInput((this.paymentButtons[index] * 100).toString());
  }

  /**
   * Calculate change amount and fire a sweet alert to inform the user
   */
  calculateChange() {
    this.cash = this.shareDataService.floatCash;
    const change = (this.cash - this.totalCost).toFixed(2);
    Swal.fire({
      icon: 'success',
      title: '<strong class="text-success">' + change + '</strong>',
      text: 'Der errechnete Zahlbetrag',
      showCancelButton: false,
      confirmButtonColor: '#19bcc3',
      confirmButtonText: 'Bestätigt'
    });
  }
}
