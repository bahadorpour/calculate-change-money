import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShareDataService } from 'src/app/services/share-data.service';

@Component({
  selector: 'app-pay-cash',
  templateUrl: './pay-cash.component.html',
  styleUrls: ['./pay-cash.component.css']
})
export class PayCashComponent implements OnInit, OnDestroy {
  totalCost: number;
  private subscription: Subscription = new Subscription();

  constructor(private shareDataService: ShareDataService) { }

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
          console.log('pay-cash', this.totalCost);
        })
    );
  }
}
