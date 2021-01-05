import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleTabsComponent } from './sale-tabs.component';

describe('SaleTabsComponent', () => {
  let component: SaleTabsComponent;
  let fixture: ComponentFixture<SaleTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
