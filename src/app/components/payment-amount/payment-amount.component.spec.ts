import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentAmountComponent } from './payment-amount.component';

describe('PaymentAmountComponent', () => {
  let component: PaymentAmountComponent;
  let fixture: ComponentFixture<PaymentAmountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentAmountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
