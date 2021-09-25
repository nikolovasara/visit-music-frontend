import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {MusicEvent} from "../interfaces/music-event.interface";
import {BehaviorSubject, Subject} from "rxjs";
import {OrderForm} from "../models/forms/order-form.interface";
import {Order} from "../interfaces/order.interface";

@Injectable()
export class OrderManagementService {
  url = 'http://localhost:9091/api/orders'
  shoppingCartEvents : MusicEvent[] = [];
  ticketsByEvent: Map<unknown, unknown> = new Map<string, number>();
  private eventsBehaviorSubject : BehaviorSubject<MusicEvent[]> = new BehaviorSubject<MusicEvent[]>([]);
  public cartHeaderIconChange: Subject<number> = new Subject<number>();
  constructor(private _http: HttpClient) {}

  increaseTicketsSales(details: any) {
    this.ticketsByEvent = this.getTicketsByEventFromShoppingCart();
    const oldValue = this.ticketsByEvent.get(details.musicEventId.id);
    this.ticketsByEvent.set(details.musicEventId.id, +oldValue + details.numberOfSales);
    this.updateTickets()
    return this._http.post<any>('http://localhost:9091/api/orders/sales/increase', details)
  }

  decreaseTicketsSale(details: any) {
    this.ticketsByEvent = this.getTicketsByEventFromShoppingCart();
    const oldValue = this.ticketsByEvent.get(details.musicEventId.id);
    this.ticketsByEvent.set(details.musicEventId.id, +oldValue - details.numberOfSales);
    this.updateTickets()

    return this._http.post<any>('http://localhost:9091/api/orders/sales/decrease', details)
  }

  addToShoppingCart(musicEvent){
    this.shoppingCartEvents=this.getEventsFromShoppingCart();
    this.ticketsByEvent = this.getTicketsByEventFromShoppingCart();
    if(this.shoppingCartEvents==null){
      this.shoppingCartEvents=[];
    }
    if(this.ticketsByEvent==null){
      this.ticketsByEvent=new Map<string, number>();
    }

    this.ticketsByEvent.set(musicEvent.id.id, 0);
    this.updateTickets();
    this.increaseTicketsSales({musicEventId:musicEvent.id, numberOfSales:1}).subscribe(data=>musicEvent=data);
    this.shoppingCartEvents.push(musicEvent);
    this.eventsBehaviorSubject.next(this.shoppingCartEvents);

    this.updateSessionStorage();
    this.updateCartHeaderIcon(this.shoppingCartEvents.length);
  }

  removeFromShoppingCart(id){
    this.shoppingCartEvents=this.getEventsFromShoppingCart();
    this.ticketsByEvent = this.getTicketsByEventFromShoppingCart();
    console.log(this.shoppingCartEvents);
    let index=this.shoppingCartEvents.findIndex(e=>e.id.id===id)
    console.log("index: ",index);
    this.shoppingCartEvents.splice(index,1);
    this.ticketsByEvent.delete(id);
    this.updateSessionStorage();
    this.updateTickets();
    this.updateCartHeaderIcon(this.shoppingCartEvents.length);

    return this.shoppingCartEvents;

  }

  getEventsFromShoppingCart(){
    return JSON.parse(sessionStorage.getItem('eventsInCart'));
  }

  getTicketsByEventFromShoppingCart(){
    let map = new Map<string, number>();
    JSON.parse(sessionStorage.getItem('ticketsByEvent'))?.forEach(list=>{
      map.set(list[0], list[1]);
    })
    return map;
  }

  onEventAdded(){
    return this.eventsBehaviorSubject.asObservable();
  }

  updateSessionStorage(){
    sessionStorage.setItem('eventsInCart',JSON.stringify(this.shoppingCartEvents));
  }

  updateTickets(){
    sessionStorage.setItem('ticketsByEvent',JSON.stringify(Array.from(this.ticketsByEvent.entries())));

  }

  updateCartHeaderIcon(n){
    this.cartHeaderIconChange.next(n);
  }

  clearSessionStorage(){
    sessionStorage.clear();
    this.updateCartHeaderIcon(0);
  }

  createOrder(orderForm: OrderForm){
    return this._http.post(`${this.url}`, orderForm);
  }

  getAllOrders(){
    return this._http.get<any>(`${this.url}`);
  }
}
