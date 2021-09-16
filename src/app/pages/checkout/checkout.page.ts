import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { loadStripe } from '@stripe/stripe-js';
import {PaymentService} from "../../services/payment.service";
//import * as Stripe from 'stripe';

@Component({
  selector: 'checkout',
  templateUrl: 'checkout.page.html',
  styleUrls: ['checkout.page.css']
})
export class CheckoutPage implements OnInit{
  strikeCheckout:any = null;

  constructor() { }

  ngOnInit() {
   //this.establishConnection()
  }

 /* establishConnection() {
    const stripe = require('stripe')('sk_test_51JIHFwDDBoQMYZf5d1jVBZC6oQzZbZfwfsOkBM6g2MgNveIYrVdpKnfDEoONzWM4hSOoCVAM8a54e73ly3OTvUx100I7Cm6RKN');
    const express = require('express');
    const app = express();
    app.use(express.static('public'));

    const YOUR_DOMAIN = 'http://localhost:4200';

    app.post('/create-checkout-session', async (req, res) => {
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // TODO: replace this with the `price` of the product you want to sell
            price: '{{PRICE_ID}}',
            quantity: 1,
          },
        ],
        payment_method_types: [
          'card',
        ],
        mode: 'payment',
        success_url: `${YOUR_DOMAIN}/home.page.html`
      });

      res.redirect(303, session.url)
    });

    app.listen(4242, () => console.log('Running on port 4200'));
  }*/
}
