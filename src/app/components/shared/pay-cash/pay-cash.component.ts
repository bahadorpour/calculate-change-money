import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShareDataService } from 'src/app/services/share-data.service';
import { NumericKeyboardComponent } from '../numeric-keyboard/numeric-keyboard.component';

@Component({
  selector: 'app-pay-cash',
  templateUrl: './pay-cash.component.html',
  styleUrls: ['./pay-cash.component.css']
})
export class PayCashComponent implements OnInit, OnDestroy {
  totalCost: number;
  paymentButtons: number[];
  eruoPymentButtons: string[];
  private subscription: Subscription = new Subscription();
  @ViewChild(NumericKeyboardComponent, { static: false }) private numericKeyboardComponent: NumericKeyboardComponent;

  constructor(private shareDataService: ShareDataService) {
    this.paymentButtons = [];
    this.eruoPymentButtons = [];
    /*  this.shareDataService.currentKeyboardInput.subscribe(
       input => {
       }) */
  }

  ngOnInit() {
    this.subscribeTotalCost();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  /**
   * Recive total cost from sale component
   */
  private subscribeTotalCost() {
    this.subscription.add(
      this.shareDataService.currentTotalCost.subscribe(
        totalCost => {
          this.totalCost = totalCost;
          this.calculateAmounts(totalCost);
          this.convertNumToEuro(this.paymentButtons);
        })
    );
  }

  selectedButton(value, index: number) {
    this.shareDataService.updateCash(value);
    this.numericKeyboardComponent.keyboard.setInput((this.paymentButtons[index] * 100).toString());
  }

  calculateAmounts(num: number) {
    let amount: number;

    for (let index = 4; index > -1; index--) {
      switch (index) {
        case 4:
          amount = num;
          break;
        case 3:
          if (num !== Math.ceil(num)) {
            amount = Math.ceil(num);
          } else {
            amount = num + 1;
          }
          break;
        case 2:
          if (this.paymentButtons[3] % 10 === 0) {
            amount = this.paymentButtons[3] + 10;
          } else {
            amount = (5 - (this.paymentButtons[3] % 5)) + this.paymentButtons[3];

          }
          break;
        case 1:
          let i = 0;
          while (i <= this.paymentButtons[2]) {
            i = i + 10;
          }
          amount = i;
          break;

        case 0:
          amount = ((10 ** ((this.paymentButtons[1] + '').length)));
          break;
      }
      this.paymentButtons[index] = amount;
    }
    console.log(this.paymentButtons);
  }

  /**
   * format numbers of buttons as currency string
   * @param nums float number
   */
  convertNumToEuro(nums: number[]): void {
    this.eruoPymentButtons = [];
    nums.forEach(element => {
      this.eruoPymentButtons.push(this.shareDataService.convertNumToEuro(element));
    });
  }

  onPayCash() {

  }
}
