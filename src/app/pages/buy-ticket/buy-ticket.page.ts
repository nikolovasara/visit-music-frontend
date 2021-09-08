import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { loadStripe } from '@stripe/stripe-js';
import {PaymentService} from "../../services/payment.service";
import {Observable, Subject} from "rxjs";

@Component({
  selector: 'payment',
  templateUrl: 'buy-ticket.page.html',
  styleUrls: ['buy-ticket.page.css']
})
export class BuyTicketPage implements OnInit{
  strikeCheckout:any = null;

  public isOrderCreated: boolean = false;

  constructor() { }

  ngOnInit() {
    this.stripePaymentGateway();
  }

  checkout(amount, totalTickets, totalEvents) {
    const result = new Subject<boolean>();
    const strikeCheckout = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51JIHFwDDBoQMYZf5joYnEYlKyRaCJhQNMD2IZqTPatZphEZZEimPRlcJC44UQfTZZZlQQNoHZ7PWLaYAW11o3Cvo00aUEUe0jA',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken)
        alert('Stripe token generated!');
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
          key: 'pk_test_12239293949ksdfksdjkfj1232q3jkjssdfjk',
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
