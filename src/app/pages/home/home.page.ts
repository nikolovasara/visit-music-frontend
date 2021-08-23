import {ChangeDetectorRef, Component, OnInit} from "@angular/core";
import {MusicEventService} from "../../services/music-event.service";
import {MusicEvent} from "../../interfaces/music-event.interface";
import {tap} from "rxjs/operators";
import {Router} from "@angular/router";
import {OrderManagementService} from "../../services/order-management.service";

@Component({
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.css']
})
export class HomePage implements OnInit{

  musicEvents: MusicEvent[] = [];
  pageOfItems: Array<any>;
  clicked:Map<string,boolean>=new Map<string, boolean>();

  constructor(private router:Router,
              private musicEventService: MusicEventService,
              private orderManagementService : OrderManagementService) {

  }

  ngOnInit() {
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

        })
      ).subscribe()
    this.disableAddButtonsForEventsInCart()

  }

  disableAddButtonsForEventsInCart(){
    this.musicEvents.forEach((m)=>{
      this.clicked.set(m.id.id,false);
    })
    let eventsInCart=this.orderManagementService.getEventsFromShoppingCart()
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
  }

  onChangePage(pageOfMusicEvents: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfMusicEvents;
  }

}
