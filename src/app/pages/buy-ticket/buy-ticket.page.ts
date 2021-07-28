import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { loadStripe } from '@stripe/stripe-js';
import {PaymentService} from "../../services/payment.service";

@Component({
  templateUrl: 'buy-ticket.page.html',
  styleUrls: ['buy-ticket.page.css']
})
export class BuyTicketPage implements OnInit{
  paymentForm: FormGroup;
  stripePromise = loadStripe('pk_test_51JIHFwDDBoQMYZf5joYnEYlKyRaCJhQNMD2IZqTPatZphEZZEimPRlcJC44UQfTZZZlQQNoHZ7PWLaYAW11o3Cvo00aUEUe0jA');
  constructor(private formBuilder: FormBuilder,
              private paymentService: PaymentService) {
  }

  ngOnInit() {
    this.paymentForm = this.formBuilder.group({
      cardNumber: ['', Validators.required],
      cvc: ['', Validators.required]
    })
  }

  async pay() {
    const payment = {
      name: 'Ticket',
      currency: 'usd',
      // amount on cents *10 => to be on dollar
      amount: 99900,
      quantity: '1'
    };

    const stripe = await this.stripePromise;

    this.paymentService.pay(payment, stripe)
  }
}
