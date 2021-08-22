import {Component, Input, OnInit} from "@angular/core";
import {MusicEvent} from "../../interfaces/music-event.interface";
import {ActivatedRoute, Router} from "@angular/router";
import {OrderManagementService} from "../../services/order-management.service";
import {tap} from "rxjs/operators";
import {Observable} from "rxjs";
import {CurrencyConverterPipe} from "../../pipes/currency-converter.pipe";

@Component({
  templateUrl:'shopping-cart.page.html',
  styleUrls: ['shopping-cart.page.css']
})
export class ShoppingCartPage implements OnInit{
  selectedMusicEvent: MusicEvent | any;
  musicEvents : MusicEvent[];
  ticketsByEvent =new Map<string, number>();
  total:number;
  @Input() totalTickets: number;

  constructor(private router: Router,
              private activatedRoute:ActivatedRoute,
              private orderManagementService:OrderManagementService,
              private currencyConverter : CurrencyConverterPipe) {

    this.selectedMusicEvent= this.router.getCurrentNavigation().extras.state;
  }

  ngOnInit(){
    this.orderManagementService.onEventAdded().subscribe(
      _=>{ });
    this.getFromLocalStorage();
    this.updateTotalNumberOfTickets();
    this.setTotal();
  }

  getFromLocalStorage(){
    this.musicEvents=this.orderManagementService.getEventsFromShoppingCart();
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

    this.total=total;
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
    this.getFromLocalStorage();
    this.setTotal();
    this.updateTotalNumberOfTickets();
  }

  convertValue($event){
    console.log($event.target.value);
    this.total=this.currencyConverter.transform(this.total, $event.target.value);
    this.musicEvents.forEach(e=>{
      e.ticketPrice.amount=this.currencyConverter.transform(e.ticketPrice.amount,$event.target.value);
      e.ticketPrice.currency=$event.target.value;
    })
  }
}
