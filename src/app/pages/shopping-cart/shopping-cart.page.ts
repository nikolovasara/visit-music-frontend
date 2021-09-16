import {AfterViewInit, Component, Input, OnInit, ViewChild} from "@angular/core";
import {MusicEvent} from "../../interfaces/music-event.interface";
import {ActivatedRoute, Router} from "@angular/router";
import {OrderManagementService} from "../../services/order-management.service";
import {tap} from "rxjs/operators";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {CurrencyConverterPipe} from "../../pipes/currency-converter.pipe";
import {BuyTicketPage} from "../buy-ticket/buy-ticket.page";

@Component({
  templateUrl:'shopping-cart.page.html',
  styleUrls: ['shopping-cart.page.css']
})
export class ShoppingCartPage implements OnInit, AfterViewInit{
  selectedMusicEvent: MusicEvent | any;
  musicEvents : MusicEvent[];
  ticketsByEvent =new Map<string, number>();
  total:number;

  @Input() totalTickets: number = 0;

  paymentComponentReady : Subject<boolean> = new BehaviorSubject(false);
  @ViewChild(BuyTicketPage) buyTicket: BuyTicketPage;

  constructor(private router: Router,
              private activatedRoute:ActivatedRoute,
              private orderManagementService:OrderManagementService,
              private currencyConverter : CurrencyConverterPipe) {

    this.selectedMusicEvent= this.router.getCurrentNavigation().extras.state;
  }

  ngOnInit(){
    this.orderManagementService.onEventAdded().subscribe(
      _=>{ });
    this.getFromSessionStorage();
    this.updateTotalNumberOfTickets();
    this.allInEuros();
    this.setTotal();
  }

  ngAfterViewInit(){
    this.paymentComponentReady.next(true);
  }

  allInEuros(){
    this.musicEvents.forEach(e=>{
      if(e.ticketPrice.currency=="MKD"){
        e.ticketPrice.amount=this.currencyConverter.transform(e.ticketPrice.amount,"EUR");
        e.ticketPrice.currency="EUR";
      }
    })
  }

  getFromSessionStorage(){
    this.musicEvents=this.orderManagementService.getEventsFromShoppingCart();
    if(this.musicEvents==null){
      this.musicEvents=[];
    }
    this.musicEvents.forEach(e=>{this.ticketsByEvent.set(e.id.id,1)});
  }

  increaseSales(qty) {
    this.orderManagementService.increaseTicketsSales({musicEventId:this.selectedMusicEvent.id, numberOfSales:qty })
      .pipe(
        tap(event => console.log(event))
      ).subscribe()
  }

  decreaseSales(qty) {
    console.log("Selected event: ",this.selectedMusicEvent);
    this.orderManagementService.decreaseTicketsSale({musicEventId:this.selectedMusicEvent.id, numberOfSales:qty })
      .pipe(
        tap(event => console.log(event))
      ).subscribe()
  }


  updateSales($event, id){
    this.selectedMusicEvent = this.musicEvents.find(e=>e.id.id===id)
    let ticketsForSelectedEvent = this.ticketsByEvent.get(id)
    if($event.target.value > ticketsForSelectedEvent){
      console.log("INCREASED");
      this.increaseSales($event.target.value - ticketsForSelectedEvent);
      ticketsForSelectedEvent=$event.target.value;
      this.ticketsByEvent.delete(id);
      this.ticketsByEvent.set(id, ticketsForSelectedEvent);
    }
    else{
      console.log("DECREASED");
      this.decreaseSales(ticketsForSelectedEvent - $event.target.value);
      ticketsForSelectedEvent=$event.target.value;
      this.ticketsByEvent.delete(id);
      this.ticketsByEvent.set(id, ticketsForSelectedEvent);
    }
    this.setTotal();
    this.updateTotalNumberOfTickets();
  }

  setTotal($event=null){
    let total=0;
    this.musicEvents.forEach(e=>{
      total+=e.ticketPrice.amount*this.getNumberOfTicketsForEvent(e.id.id)
    })

    this.total=Number(total.toFixed(2));
    return this.total;
  }

  updateTotalNumberOfTickets(){
    let sum=0;
    this.ticketsByEvent.forEach((value:number, key:string)=>{
      sum = sum + +value;
    })
    this.totalTickets= sum;
  }

  getNumberOfTicketsForEvent(id){
    return this.ticketsByEvent.get(id);
  }

  removeMusicEvent(id){
    console.log(id);
    this.orderManagementService.removeFromShoppingCart(id);
    this.ticketsByEvent.delete(id);
    this.getFromSessionStorage();
    this.setTotal();
    this.updateTotalNumberOfTickets();
  }

  convertValue($event=null){
    console.log($event.target.value);
    this.total=this.currencyConverter.transform(this.total, $event.target.value);
    this.musicEvents.forEach(e=>{
      e.ticketPrice.amount=this.currencyConverter.transform(e.ticketPrice.amount,$event.target.value);
      e.ticketPrice.currency=$event.target.value;
    });
  }

  orderCreated(amount){
    this.pay(amount);
    console.log("ORDER CREATED");
  }

  pay(amount){
    this.buyTicket.checkout(amount, this.totalTickets, this.musicEvents.length, 1)
      .subscribe(result=>{
        if(result){
          this.orderManagementService.clearSessionStorage();
          this.totalTickets=0;
          this.getFromSessionStorage();
        }
      });
  }
}
