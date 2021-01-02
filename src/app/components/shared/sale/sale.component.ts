import { Component, OnInit } from '@angular/core';
import { ShareDataService } from 'src/app/services/share-data.service';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {
  randomNumber: number; // a random number for total cost
  totalCost: string;
  constructor(private data: ShareDataService) {
    this.randomNumber = this.getRandomFloatInclusive(1, 100); // TO DO: change to 100000
    this.totalCost = this.convertNumToLocale(this.randomNumber);
    this.data.updateTotalCost(this.randomNumber);
  }

  ngOnInit() { }

  /**
   * format numbers to locale with currency format
   * German uses comma as decimal separator and period for thousands
   * @param number given number
   * @returns A string with a language-sensitive representation of the given number
   */
  private convertNumToLocale(number: number): string {
    return number.toLocaleString(
      'de-DE',
      {
        style: 'currency',
        currency: 'EUR'
      })
  }

  /**
   * returns an integer random number between min (included) and max (included) with 2 decimal places
   * @param min minimum number
   * @param max maximum number
   */
  private getRandomFloatInclusive(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    let randomNumber = Math.random() * (max - min + 1) + min;
    let fixedPoint = randomNumber.toFixed(2);
    return parseFloat(fixedPoint);
  }
}
