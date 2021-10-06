import {Component, OnInit} from "@angular/core";
import {Subject} from "rxjs";
import {PaymentService} from "../../services/payment.service";
import {formatCurrency} from "@angular/common";

@Component({
  selector: 'payment',
  templateUrl: 'buy-ticket.page.html',
  styleUrls: ['buy-ticket.page.css']
})
export class BuyTicketPage implements OnInit{
  strikeCheckout:any = null;

  public isOrderCreated: boolean = false;
  public buyerEmail:string;

  constructor(private _service: PaymentService) { }

  ngOnInit() {

    this.stripePaymentGateway();
  }

  setBuyer(val){
    this.buyerEmail = val;
  }

  checkout(amount, currency, totalTickets, totalEvents, quantity) {
    let setBuyer = this;
    const serv = this._service;
    const result = new Subject<boolean>();
    const strikeCheckout = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51JIHFwDDBoQMYZf5joYnEYlKyRaCJhQNMD2IZqTPatZphEZZEimPRlcJC44UQfTZZZlQQNoHZ7PWLaYAW11o3Cvo00aUEUe0jA',
      locale: 'auto',
      currency: currency=='MKD'? 'mkd' : 'eur',
      token: function (stripeToken: any) {
        console.log(stripeToken)
        setBuyer.setBuyer(stripeToken.email);
        alert('Stripe token generated!');
        serv.pay(amount, stripeToken.id, currency).subscribe();
        result.next(true);
      }
    });
    this.isOrderCreated=true;

    strikeCheckout.open({
      name: 'Visit Music',
      description: 'Tickets purchasing',
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
