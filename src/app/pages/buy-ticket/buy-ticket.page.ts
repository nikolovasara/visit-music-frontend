import {Component, OnInit} from "@angular/core";
import {Subject} from "rxjs";
import {PaymentService} from "../../services/payment.service";

@Component({
  selector: 'payment',
  templateUrl: 'buy-ticket.page.html',
  styleUrls: ['buy-ticket.page.css']
})
export class BuyTicketPage implements OnInit{
  strikeCheckout:any = null;

  public isOrderCreated: boolean = false;

  constructor(private _service: PaymentService) { }

  ngOnInit() {

    this.stripePaymentGateway();
  }

  checkout(amount, totalTickets, totalEvents, quantity) {
    const serv = this._service;
    const result = new Subject<boolean>();
    const strikeCheckout = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51JIHFwDDBoQMYZf5joYnEYlKyRaCJhQNMD2IZqTPatZphEZZEimPRlcJC44UQfTZZZlQQNoHZ7PWLaYAW11o3Cvo00aUEUe0jA',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken)
        alert('Stripe token generated!');
        serv.pay(amount, stripeToken.id, 'USD', quantity).subscribe();
        result.next(true);
      }
    });

    this.isOrderCreated=true;

    strikeCheckout.open({
      name: 'RemoteStack',
      description: 'Payment widgets',
      amount: amount * 100
    });

    return result.asObservable();
  }

  stripePaymentGateway() {
    if(!window.document.getElementById('stripe-script')) {
      const scr = window.document.createElement("script");
      scr.id = "stripe-script";
      scr.type = "text/javascript";
      scr.src = "https://checkout.stripe.com/checkout.js";

      scr.onload = () => {
        this.strikeCheckout = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51JIHFwDDBoQMYZf5joYnEYlKyRaCJhQNMD2IZqTPatZphEZZEimPRlcJC44UQfTZZZlQQNoHZ7PWLaYAW11o3Cvo00aUEUe0jA',
          locale: 'auto',
          token: function (token: any) {
            console.log(token)
            alert('Payment via stripe successfull!');
          }
        });
      }

      window.document.body.appendChild(scr);
    }
  }
}
