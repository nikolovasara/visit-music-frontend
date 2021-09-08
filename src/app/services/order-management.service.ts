import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {MusicEvent} from "../interfaces/music-event.interface";
import {BehaviorSubject, Subject} from "rxjs";

@Injectable()
export class OrderManagementService {
  url = 'http://localhost:9091/api/orders'
  shoppingCartEvents : MusicEvent[] = [];
  private eventsBehaviorSubject : BehaviorSubject<MusicEvent[]> = new BehaviorSubject<MusicEvent[]>([]);
  public cartHeaderIconChange: Subject<number> = new Subject<number>();
  constructor(private _http: HttpClient) {}

  increaseTicketsSales(details: any) {
    return this._http.post<any>('http://localhost:9091/api/orders/sales/increase', details)
  }

  decreaseTicketsSale(details: any) {
    return this._http.post<any>('http://localhost:9091/api/orders/sales/decrease', details)
  }

  addToShoppingCart(musicEvent){
    this.shoppingCartEvents=this.getEventsFromShoppingCart();
    if(this.shoppingCartEvents==null){
      this.shoppingCartEvents=[];
    }
    this.shoppingCartEvents.push(musicEvent);
    this.eventsBehaviorSubject.next(this.shoppingCartEvents);

    this.updateSessionStorage();
    this.updateCartHeaderIcon(this.shoppingCartEvents.length);
  }

  removeFromShoppingCart(id){
    this.shoppingCartEvents=this.getEventsFromShoppingCart();
    console.log(this.shoppingCartEvents);
    let index=this.shoppingCartEvents.findIndex(e=>e.id.id===id)
    console.log("index: ",index);
    this.shoppingCartEvents.splice(index,1);
    this.updateSessionStorage();
    this.updateCartHeaderIcon(this.shoppingCartEvents.length);

  }

  getEventsFromShoppingCart(){
    return JSON.parse(sessionStorage.getItem('eventsInCart'));
  }

  onEventAdded(){
    return this.eventsBehaviorSubject.asObservable();
  }

  updateSessionStorage(){
    sessionStorage.setItem('eventsInCart',JSON.stringify(this.shoppingCartEvents));
  }

  updateCartHeaderIcon(n){
    this.cartHeaderIconChange.next(n);
  }

  clearSessionStorage(){
    sessionStorage.clear();
    this.updateCartHeaderIcon(0);
  }
}
