import {AfterViewInit, Component, Input, OnInit, ViewChild} from "@angular/core";
import {MusicEvent} from "../../interfaces/music-event.interface";
import {ActivatedRoute, Router} from "@angular/router";
import {OrderManagementService} from "../../services/order-management.service";
import {tap} from "rxjs/operators";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {CurrencyConverterPipe} from "../../pipes/currency-converter.pipe";
import {BuyTicketPage} from "../buy-ticket/buy-ticket.page";
import {OrderForm} from "../../models/forms/order-form.interface";

@Component({
  templateUrl: 'shopping-cart.page.html',
  styleUrls: ['shopping-cart.page.css']
})
export class ShoppingCartPage implements OnInit, AfterViewInit {
  selectedMusicEvent: MusicEvent | any;
  musicEvents: MusicEvent[];
  ticketsByEvent = new Map<string, number>();
  total: number;

  @Input() totalTickets: number = 0;

  paymentComponentReady: Subject<boolean> = new BehaviorSubject(false);
  @ViewChild(BuyTicketPage) buyTicket: BuyTicketPage;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private orderManagementService: OrderManagementService,
              private currencyConverter: CurrencyConverterPipe) {

    this.selectedMusicEvent = this.router.getCurrentNavigation().extras.state;
  }

  ngOnInit() {
    this.orderManagementService.onEventAdded().subscribe(
      _ => {
      });
    this.getFromSessionStorage();
    this.updateTotalNumberOfTickets();
    this.allInEuros();
    this.setTotal();
  }

  ngAfterViewInit() {
    this.paymentComponentReady.next(true);
  }

  allInEuros() {
    this.musicEvents.forEach(e => {
      if (e.ticketPrice.currency == "MKD") {
        e.ticketPrice.amount = this.currencyConverter.transform(e.ticketPrice.amount, "EUR");
        e.ticketPrice.currency = "EUR";
      }
    })
  }

  getFromSessionStorage(){
    this.musicEvents=this.orderManagementService.getEventsFromShoppingCart();
    this.ticketsByEvent = this.orderManagementService.getTicketsByEventFromShoppingCart();
    if(this.musicEvents==null){
      this.musicEvents=[];
    }
    if(this.ticketsByEvent==null){
      this.ticketsByEvent=new Map<string, number>();
    }
  }

  increaseSales(qty) {
    this.orderManagementService.increaseTicketsSales({musicEventId: this.selectedMusicEvent.id, numberOfSales: qty})
      .pipe(
        tap(event => console.log(event))
      ).subscribe()
  }

  decreaseSales(qty, id = null) {
    console.log("Selected event: ", this.selectedMusicEvent);
    this.orderManagementService.decreaseTicketsSale({
      musicEventId: id == null ? this.selectedMusicEvent.id : id,
      numberOfSales: qty
    })
      .pipe(
        tap(event => console.log(event))
      ).subscribe()
  }


  updateSales($event, id) {
    this.selectedMusicEvent = this.musicEvents.find(e => e.id.id === id)
    let ticketsForSelectedEvent = this.ticketsByEvent.get(id)
    if ($event.target.value > ticketsForSelectedEvent) {
      console.log("INCREASED");
      this.increaseSales($event.target.value - ticketsForSelectedEvent);
      ticketsForSelectedEvent = $event.target.value;
      this.ticketsByEvent.delete(id);
      this.ticketsByEvent.set(id, ticketsForSelectedEvent);
    } else {
      console.log("DECREASED");
      this.decreaseSales(ticketsForSelectedEvent - $event.target.value);
      ticketsForSelectedEvent = $event.target.value;
      this.ticketsByEvent.delete(id);
      this.ticketsByEvent.set(id, ticketsForSelectedEvent);
    }
    this.setTotal();
    this.updateTotalNumberOfTickets();
  }

  setTotal($event = null) {
    let total = 0;
    this.musicEvents.forEach(e => {
      total += e.ticketPrice.amount * this.getNumberOfTicketsForEvent(e.id.id)
    })

    this.total = Number(total.toFixed(2));
    return this.total;
  }

  updateTotalNumberOfTickets() {
    let sum = 0;
    this.ticketsByEvent.forEach((value: number, key: string) => {
      sum = sum + +value;
    })
    this.totalTickets = sum;
  }

  getNumberOfTicketsForEvent(id) {
    return this.ticketsByEvent.get(id);
  }

  removeMusicEvent(id) {
    console.log(id);
    this.musicEvents = this.orderManagementService.removeFromShoppingCart(id);
    this.decreaseSales(this.ticketsByEvent.get(id), id);
    this.ticketsByEvent.delete(id);
    this.allInEuros();
    this.setTotal();
    this.updateTotalNumberOfTickets();
  }

  convertValue($event = null) {
    console.log($event.target.value);

    this.musicEvents.forEach(e => {
      e.ticketPrice.amount = this.currencyConverter.transform(e.ticketPrice.amount, $event.target.value);
      e.ticketPrice.currency = $event.target.value;
    });
    if ($event != null) {
      this.total = 0;
      this.musicEvents.forEach(e => {
        this.total = +this.total + (e.ticketPrice.amount * this.ticketsByEvent.get(e.id.id))
      });
      return;
    }
    this.total = this.currencyConverter.transform(this.total, $event.target.value);
  }

  orderCreated(amount) {
    this.pay(amount);
    /* let musicEvent;
    this.musicEventService.getById('dd59680e-8955-4083-bcf9-611e60e0c23a').subscribe(
      data=> {
        musicEvent=data;
        this.createOrder(musicEvent);
      }
    );*/

    let orderForm = new OrderForm();
    orderForm.total = { amount: this.total, currency: this.musicEvents[0].ticketPrice.currency};
    this.musicEvents.forEach(event=> orderForm.tickets.push({musicEvent: event, quantity: this.ticketsByEvent.get(event.id.id)}));

    this.orderManagementService.createOrder(orderForm).subscribe(data=>console.log(data));

    this.total = 0;
    console.log("ORDER CREATED");
  }

  pay(amount) {
    this.buyTicket.checkout(amount, this.musicEvents[0].ticketPrice.currency, this.totalTickets, this.musicEvents.length, 1)
      .subscribe(result => {
        if (result) {
          this.orderManagementService.clearSessionStorage();
          this.totalTickets = 0;
          this.getFromSessionStorage();
        }
      });
  }
}
