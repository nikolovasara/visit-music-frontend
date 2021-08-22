import {Component, Input, OnInit} from "@angular/core";
import {MusicEvent} from "../../interfaces/music-event.interface";
import {ActivatedRoute, Router} from "@angular/router";
import {OrderManagementService} from "../../services/order-management.service";
import {tap} from "rxjs/operators";
import {Observable} from "rxjs";

@Component({
  templateUrl:'shopping-cart.page.html',
  styleUrls: ['shopping-cart.page.css']
})
export class ShoppingCartPage implements OnInit{
  musicEvent: MusicEvent | any;
  @Input() totalTickets: number = 1;
  @Input() totalTicketsPrev: number = 1;

  constructor(private router: Router, private activatedRoute:ActivatedRoute, private orderManagementService:OrderManagementService) {

    this.musicEvent= this.router.getCurrentNavigation().extras.state;
  }

  ngOnInit()  {
    this.increaseSales();
  }

  increaseSales() {
    let inc = this.totalTickets - this.totalTicketsPrev;
    this.orderManagementService.increaseTicketsSales({musicEventId:this.musicEvent.id, numberOfSales:inc })
      .pipe(
        tap(event => console.log(event))
      ).subscribe()
  }

  getPrevSalesValue(){
    this.totalTicketsPrev = this.totalTickets;
  }

  updateSales($event){
    if($event.target.value > this.totalTicketsPrev){
      console.log("INCREASED");
      this.increaseSales();
    }
    else{
      console.log("DECREASED");
    }
  }
}
