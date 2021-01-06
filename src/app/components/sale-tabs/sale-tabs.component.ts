/**
 * SaleTabsComponent : A container for all tabs
 * Author: Mojdeh Bahadorpour
 */
import {
  AfterContentInit, Component, ComponentFactoryResolver, ContentChildren,
  QueryList, ViewChild, ViewContainerRef
} from '@angular/core';
import { ShareDataService } from 'src/app/services/share-data.service';
import { SaleComponent } from '../shared/sale/sale.component';

@Component({
  selector: 'app-sale-tabs',
  templateUrl: './sale-tabs.component.html',
  styleUrls: ['./sale-tabs.component.css']
})
export class SaleTabsComponent implements AfterContentInit {
  dynamicTabs: SaleComponent[] = [];
  dynamicTabsIndex: number;

  @ContentChildren(SaleComponent) tabs: QueryList<SaleComponent>;
  @ViewChild('container', { static: true, read: ViewContainerRef }) dynamicTabPlaceholder;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private shareDataService: ShareDataService) {
    this.dynamicTabsIndex = 11;
  }

  /**
   * contentChildren are set
   */
  ngAfterContentInit() {
    // get all active tabs
    const activeTabs = this.tabs.filter(tab => tab.active);

    // if there is no active tab set, activate the first
    if (activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }
  }

  /**
   * get a component factory for our TabComponent
   * create a component instance
   * set the according properties on our component instance
   * remember the dynamic component for rendering the tab navigation headers
   * set it active
   */
  openTab(title: string, isCloseable = false) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(SaleComponent);
    const viewContainerRef = this.dynamicTabPlaceholder;

    const componentRef = viewContainerRef.createComponent(componentFactory);

    const instance: SaleComponent = componentRef.instance as SaleComponent;
    instance.title = title;
    instance.isCloseable = isCloseable;

    this.dynamicTabs.push(componentRef.instance as SaleComponent);
    this.dynamicTabsIndex++;

    this.selectTab(this.dynamicTabs[this.dynamicTabs.length - 1]);
  }

  /**
   * deactivate all tabs
   * activate the tab the user has clicked on
   */
  selectTab(saleTab: SaleComponent) {
    this.tabs.toArray().forEach(tab => (tab.active = false));
    this.dynamicTabs.forEach(tab => (tab.active = false));

    saleTab.active = true;
    this.shareDataService.updateTotalCost(this.shareDataService.convertEuroToNum(saleTab.totalCost));
    this.shareDataService.updateCash(this.shareDataService.convertNumToEuro(0));
  }

  /**
   * remove the tab from our array
   * destroy our dynamically created component again
   * set tab index to 1st one
   */
  closeTab(tab: SaleComponent) {
    for (let i = 0; i < this.dynamicTabs.length; i++) {
      if (this.dynamicTabs[i] === tab) {
        this.dynamicTabs.splice(i, 1);

        const viewContainerRef = this.dynamicTabPlaceholder;
        viewContainerRef.remove(i);
        this.dynamicTabsIndex--;
        if (this.dynamicTabs.length) {
          this.selectTab(this.dynamicTabs[this.dynamicTabs.length - 1]);
        } else {
          this.selectTab(this.tabs.first);
        }
        break;
      }
    }
  }

  /**
   * close the 1st active tab (should only be one at a time)
   */
  closeActiveTab() {
    const activeTabs = this.dynamicTabs.filter(tab => tab.active);
    if (activeTabs.length > 0) {
      this.closeTab(activeTabs[0]);
    }
  }
}
