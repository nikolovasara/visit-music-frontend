import {ChangeDetectorRef, Component, OnInit} from "@angular/core";
import {MusicEventService} from "../../services/music-event.service";
import {MusicEvent} from "../../interfaces/music-event.interface";
import {tap} from "rxjs/operators";
import {Router} from "@angular/router";
import {OrderManagementService} from "../../services/order-management.service";
import {AuthService} from "../../services/auth.service";
import {NotifierService} from "angular-notifier";
import {EventFilter} from "../../models/forms/event-filter.interface";
import {Money} from "../../interfaces/ticket-price.interface";
import {CustomDatePipe} from "../../pipes/custom-date.pipe";
import {formatDate} from "@angular/common";
import {DateUtils} from "../../utils/dates/date-utils.component";

@Component({
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.css']
})
export class HomePage implements OnInit{
  isLoggedIn = false;
  musicEvents: MusicEvent[] = [];
  musicEventsFromDb:MusicEvent[] = [];
  pageOfItems: Array<any>;
  clicked:Map<string,boolean>=new Map<string, boolean>();

  constructor(private router:Router,
              private musicEventService: MusicEventService,
              private orderManagementService : OrderManagementService,
              private authService: AuthService,
              private notifierService: NotifierService) {
  }

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.musicEventService.getAll()
      .pipe(
        tap((events) => {
          this.musicEvents = events
          if(this.router.url.includes("macedonia")){
            let filtered=[];
            for(let i=0; i<this.musicEvents.length; i++){
              if(this.musicEvents[i].venue.location.country==='Macedonia'){
                filtered.push(this.musicEvents[i]);
              }
            }
            this.musicEvents=filtered;
          }
          else if(this.router.url.includes('world')){
            let filtered=[];
            for(let i=0; i<this.musicEvents.length; i++){
              if(this.musicEvents[i].venue.location.country!=='Macedonia'){
                filtered.push(this.musicEvents[i]);
              }
            }
            this.musicEvents=filtered;
          }
          this.musicEvents.sort((a,b)=>(a.eventTime>b.eventTime?1:-1))
          this.musicEventsFromDb = this.musicEvents;
          console.log(this.musicEvents)
        })
      ).subscribe()
    this.disableAddButtonsForEventsInCart()

  }

  filterByCountry(country){
    this.musicEvents = this.musicEvents.filter(e=>e.venue.location.country == country);
  }

  filterByGenre(genre){
    this.musicEvents = this.musicEvents.filter(e=>e.musicPerformerList[0].genre == genre.toString());
  }

  filterByDate(dateMin, dateMax, condition){
    const t=this.resetHours(this.musicEvents[0].eventTime);
    console.log("CONSTR ", t)
    console.log(new Date(dateMin))
    switch(condition){
      case 'gt':{
        this.musicEvents = this.musicEvents.filter(e=>DateUtils.checkIfAfter(e.eventTime, dateMin));
        break;
      }
      case 'lt':{
        this.musicEvents = this.musicEvents.filter(e=>DateUtils.checkIfBefore(e.eventTime, dateMin));
        break;
      }
      case 'eq':{
        this.musicEvents = this.musicEvents.filter(e=>new Date(e.eventTime).getDay()==new Date(dateMin).getDay()
        && new Date(e.eventTime).getMonth()==new Date(dateMin).getMonth()
        && new Date(e.eventTime).getFullYear()==new Date(dateMin).getFullYear());
        break;
      }
      case 'neq':{
        this.musicEvents = this.musicEvents.filter(e=>new Date(e.eventTime).getDay()!=new Date(dateMin).getDay());
        break;
      }
      case 'range':{
        this.musicEvents = this.musicEvents.filter(e=>DateUtils.checkIfBefore(e.eventTime,dateMin) == false && DateUtils.checkIfAfter(e.eventTime, dateMax) == false);
        break;
      }
    }
  }

  resetHours(date: Date){
    const d= new Date(date);
    d.setHours(0,0,0)
    return d;
  }

  filterByKeyword(kw:string){
    this.musicEventService.findEvent(kw).pipe(tap(data=>{
      this.musicEvents=data
    }))
      .subscribe();
  }

  filterByPrice(priceMin:number, priceMax:number){
    this.musicEvents = this.musicEvents.filter(e=>this.convertToEuro(e.ticketPrice) >= priceMin && this.convertToEuro(e.ticketPrice) <= priceMax);
  }

  convertToEuro(ticketPrice: Money){
    if(ticketPrice.currency=="EUR"){
       return ticketPrice.amount;
    }
     return ticketPrice.amount/61.5;
  }

  filter(filters: EventFilter){
    this.musicEvents = this.musicEventsFromDb;
    if(filters.country != undefined){
      this.filterByCountry(filters.country);
    }
    if(filters.genre != undefined){
      this.filterByGenre(filters.genre);
    }
    if(filters.price != undefined){
      this.filterByPrice(filters.price[0], filters.price[1]);
    }

    if(filters.date != undefined){
      if(filters.date instanceof Date){
        console.log("SINGLE")
        this.filterByDate(filters.date,filters.date, filters.dateCondition);
      }
      else{
        console.log("RANGE")
        this.filterByDate(filters.date[0],filters.date[1], filters.dateCondition);
      }
    }

    if(filters.keyword != undefined){
      this.filterByKeyword(filters.keyword);
    }
  }

  disableAddButtonsForEventsInCart(){
    this.musicEvents.forEach((m)=>{
      this.clicked.set(m.id.id,false);
    })
    let eventsInCart=this.orderManagementService.getEventsFromShoppingCart() == null ? [] : this.orderManagementService.getEventsFromShoppingCart()
    console.log(eventsInCart)
    eventsInCart.forEach((m)=>{
      this.clicked.delete(m.id.id);
      this.clicked.set(m.id.id,true);
    })
    console.log(this.clicked);
  }

  addToCart(musicEvent){
    this.orderManagementService.addToShoppingCart(musicEvent);
    this.disableAddButtonsForEventsInCart();
    console.log(this.clicked)
    this.notifierService.notify('success','Item added to cart.')
  }

  onChangePage(pageOfMusicEvents: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfMusicEvents;
  }

  deleteEvent(id){
    this.musicEventService.deleteMusicEvent(id)
      .pipe(tap(success=>console.log(success)))
      .subscribe();
    this.musicEventService.getAll().pipe(tap(data=>this.musicEvents=data)).subscribe();
  }

}
