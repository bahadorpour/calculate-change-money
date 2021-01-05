import { Component, ComponentFactoryResolver, OnDestroy, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
import { SaleComponent } from '../shared/sale/sale.component';

@Component({
  selector: 'app-payment-amount',
  templateUrl: './payment-amount.component.html',
  styleUrls: ['./payment-amount.component.css']
})
export class PaymentAmountComponent implements OnDestroy {
  private readonly onDestroy: Subject<any> = new Subject<any>();

  @ViewChild('container', { static: true, read: ViewContainerRef }) container: ViewContainerRef;
  // Keep track of list of generated components for removal purposes
  components = [];


  // Expose class so that it can be used in the template
  saleComponentClass = SaleComponent;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnDestroy() {
    this.onDestroy.next();
  }


  addComponent(componentClass: Type<any>) {
    // Create component dynamically inside the ng-template
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentClass);
    // this.container.clear();
    const component = this.container.createComponent<SaleComponent>(componentFactory);

    // Push the component so that we can keep track of which components are created
    this.components.push(component);
  }

  removeComponent(componentClass: Type<any>) {
    // Find the component
    const component = this.components.find((component) => component.instance instanceof componentClass);
    const componentIndex = this.components.indexOf(component);

    if (componentIndex !== -1) {
      // Remove component from both view and array
      this.container.remove(this.container.indexOf(component));
      this.components.splice(componentIndex, 1);
    }
  }

}
