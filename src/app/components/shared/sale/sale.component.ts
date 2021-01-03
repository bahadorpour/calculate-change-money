import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShareDataService } from 'src/app/services/share-data.service';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit, OnDestroy {
  randomNumber: number; // a random number for total cost
  totalCost: string;
  cash;
  private subscription: Subscription = new Subscription();

  constructor(
    private shareDataService: ShareDataService
  ) {
    this.randomNumber = this.getRandomFloatInclusive(1, 100);
    this.totalCost = this.shareDataService.convertNumToLocale(this.randomNumber);
    this.shareDataService.updateTotalCost(this.randomNumber);
  }

  ngOnInit() {
    this.subscribeKeyboardInput();
    this.subscribeCash();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  /**
   * returns an integer random number between min (included) and max (included) with 2 decimal places
   * @param min minimum number
   * @param max maximum number
   */
  private getRandomFloatInclusive(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    const randomNumber = Math.random() * (max - min + 1) + min;
    const fixedPoint = randomNumber.toFixed(2);
    return parseFloat(fixedPoint);
  }

  /**
   * 
   */
  private subscribeKeyboardInput() {
    this.subscription.add(
      this.shareDataService.currentKeyboardInput.subscribe(
        input => {
          this.cash = input;
          console.log('keyboard', input);
        })
    );
  }

  /**
   * 
   */
  private subscribeCash() {
    this.subscription.add(
      this.shareDataService.currentCash.subscribe(
        cash => {
          this.cash = cash;
          console.log('cash', cash);
        })
    );
  }
}
