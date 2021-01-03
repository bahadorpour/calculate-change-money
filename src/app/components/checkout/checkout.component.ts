import { Component, OnInit } from '@angular/core';
import { Button } from 'src/app/models/Button';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutButtons: Button[];

  constructor(
    private dataService: DataService
  ) {
    this.checkoutButtons = this.dataService.getButtons();
  }

  ngOnInit() {
  }

}
