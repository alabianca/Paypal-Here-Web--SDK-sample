import { Component, OnInit } from '@angular/core';
import { IdentityService } from '../identity.service';
import { Subscription } from 'rxjs';

declare var pphwebsdk: any;

interface Item {
  id: number,
  price: number,
  name: string,
  quantity: number,
}

const items = [
  {
    id: 1,
    name: 'Tacos',
    price: 1.00,
    quantity: 0,
  },
  {
    id: 2,
    name: 'Wings',
    price: 2.50,
    quantity: 0,
  },
  {
    id: 3,
    name: 'Beer',
    price: 3.50,
    quantity: 0,
  }
]

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent implements OnInit {
  public myCart: Item[] = [...items];
  private order = null;
  private payment_config = null;
  private access_token: string = ""
  private paypalIdentity = null;
  private identitySubscription: Subscription;

  constructor(
    private identity: IdentityService,
  ) { }

  ngOnInit() {
    this.identitySubscription = this.subscribeToIdentityInit();
    this.payment_config = pphwebsdk.PaymentConfiguration.create();
    console.log(this.payment_config)
    this.payment_config
      .subscribeEvents({
        onPaymentSuccess: (txnRecord) => {
          alert('Completed Transaction' + txnRecord.transactionNumber)
        }
      })
    this.order = pphwebsdk.Order.create();
    this.order.item('Tacos').price(1.00).quantity(1);
  }

  public cart(isAdd, item) {
    console.log(isAdd, item);
    this.myCart = this.myCart.map((cartItem) => {
      if (cartItem.id === item.id) {
        cartItem.quantity = isAdd ? cartItem.quantity + 1 : cartItem.quantity - 1;
      }

      return cartItem;
    });

    console.log(this.myCart)
  }


  public buy() {
    const items = this.myCart.filter((item) => item.quantity > 0);
    if (this.identity && items.length > 0) {
      const order = this.createOrder(items)
      pphwebsdk.Payment.create(this.identity, this.payment_config)
        .for(order)
        .as(pphwebsdk.Types.PaymentMethod.CARD)
        .sale();
    }
  }

  public getTotal(): number {
    return this.myCart.reduce((prv, curr, index) => {
      return prv + (curr.price * curr.quantity)
    }, 0)
  }

  private createOrder(items: Item[]): any {
    const _items = items.filter((item) => item.quantity > 0)
    const order = pphwebsdk.Order.create();
    _items.forEach((item) => {
      order.item(item.name).price(item.price).quantity(item.quantity);
    })

    return order;
  }

  private subscribeToIdentityInit(): Subscription {
    return this.identity.$accessToken.subscribe((token) => {
      if (token) {
        this.access_token = token;
        this.identity = pphwebsdk.Identity
          .create(token)
          .environment('sandbox')
      }
    })
  }

}
