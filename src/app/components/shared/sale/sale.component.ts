/**
 * SaleComponent : Show total cost and cash inuts
 * Author: Mojdeh Bahadorpour
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShareDataService } from 'src/app/services/share-data.service';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit, OnDestroy {
  totalCost: string;
  cash: string;
  private subscription: Subscription = new Subscription();

  constructor(private shareDataService: ShareDataService) {
    let randomNumber: number; // create a random number for total cost

    randomNumber = this.getRandomFloat(1, 1000);
    this.shareDataService.updateTotalCost(randomNumber);
    this.totalCost = this.shareDataService.convertNumToEuro(randomNumber);
  }

  ngOnInit() {
    this.subscribeCash();
    this.subscribeKeyboardInput();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  /**
   * returns an integer random number between min (included) and max (included) with 2 decimal places
   * @param min minimum number
   * @param max maximum number
   */
  private getRandomFloat(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    const randomNumber = Math.random() * (max - min + 1) + min;
    const fixedPoint = randomNumber.toFixed(2);
    return parseFloat(fixedPoint);
  }

  /**
 * set cash amount from buttons
 */
  private subscribeCash() {
    this.subscription.add(
      this.shareDataService.currentCash.subscribe(
        cash => {
          this.cash = cash;
        }
      )
    );
  }

  /**
   * set cash amount from keyboard
   */
  private subscribeKeyboardInput() {
    this.subscription.add(
      this.shareDataService.currentKeyboardInput.subscribe(
        keyboardInput => {
          // Convert keyboard input to Float  Euro Cent format . Ex. 4433 to 44.33 €
          this.cash = this.shareDataService.convertNumToEuro(
            this.covertEuroCentFormatToNum(keyboardInput)
          );
          this.shareDataService.floatCash = this.covertEuroCentFormatToNum(keyboardInput);

        }
      )
    );
  }

  /**
   * Convert keyboard input to Float --> Ex. 4433 to 44.33
   * @param input : input from keyboard
   */
  private covertEuroCentFormatToNum(input: string): number {
    let cashNum: number;
    if (input !== '') {
      let euro: number | string;
      let cent: number | string;
      euro = input.substring(0, input.length - 2);
      cent = input.substr(input.length - 2);
      euro = (euro !== '') ? parseInt(euro, 10) : 0;
      cent = (cent !== '') ? parseInt(cent, 10) * 0.01 : 0;
      cashNum = euro + cent;

    } else {
      cashNum = 0;
    }
    return cashNum;
  }
}
