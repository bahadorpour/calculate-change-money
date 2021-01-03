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
          this.convertNumToLocale(this.paymentButtons);
        })
    );
  }

  selectedButton(index: number) {
    console.log('bi eruo', this.paymentButtons[index]);
    this.shareDataService.updateCash(this.paymentButtons[index]);
    this.numericKeyboardComponent.keyboard.setInput(this.paymentButtons[index].toString());
  }

  calculateAmounts(num: number) {

    this.paymentButtons[4] = num;

    if (num !== Math.ceil(num)) {
      this.paymentButtons[3] = Math.ceil(num);
    } else {
      this.paymentButtons[3] = num + 1;
    }

    if (this.paymentButtons[3] % 10 === 0) {
      this.paymentButtons[2] = this.paymentButtons[3] + 10;
    } else {
      this.paymentButtons[2] = (5 - (this.paymentButtons[3] % 5)) + this.paymentButtons[3];

    }

    let index = 0;
    while (index <= this.paymentButtons[2]) {
      index = index + 10;
    }
    this.paymentButtons[1] = (index);
    this.paymentButtons[0] = ((10 ** ((this.paymentButtons[1] + '').length)));

    console.log(this.paymentButtons);
  }

  convertNumToLocale(nums: number[]) {
    this.eruoPymentButtons = [];
    nums.forEach(element => {
      this.eruoPymentButtons.push(this.shareDataService.convertNumToLocale(element));
    });
  }

  onPayCash() {

  }
}
