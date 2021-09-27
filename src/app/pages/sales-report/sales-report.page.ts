import {Component, OnInit} from "@angular/core";
import {OrderManagementService} from "../../services/order-management.service";
import {Id} from "../../interfaces/id.interface";
import {Venue} from "../../interfaces/venue.interface";
import {Money} from "../../interfaces/ticket-price.interface";
import {MusicPerformer} from "../../interfaces/music-performer.interface";
import {MusicEvent} from "../../interfaces/music-event.interface";
import {MusicEventService} from "../../services/music-event.service";
import {Order} from "../../interfaces/order.interface";
import {tap} from "rxjs/operators";
import {renderConstantPool} from "@angular/compiler-cli/ngcc/src/rendering/renderer";

@Component({
  templateUrl: 'sales-report.page.html',
  styleUrls: ['sales-report.page.css']
})
export class SalesReportPage implements OnInit{
  public orders: Order[];
  musicEvents: MusicEvent[];
  constructor(private orderService: OrderManagementService,
              private musicEventService: MusicEventService) {
  }

  ngOnInit(): void{
    this.orderService.getAllOrders().pipe(tap(data=>{
      this.orders = data.sort((a,b)=>(a.eventTime>b.eventTime?1:-1))
      console.log(this.orders);
    }))
      .subscribe();
    this.musicEventService.getAll().pipe(tap(data=>{
      this.musicEvents = data
      console.log(this.musicEvents);
    }))
      .subscribe();
  }

  getMusicEventById(id: string){
    return this.musicEvents.find(me=>me.id.id === id);
  }

  calculateRemainingTicketsForEvent(id: string){
    let event = this.getMusicEventById(id);
    return (event.venue.maxAllowedNumberOfVisitors*0.3) - event.sales;
  }

  getRemainingTicketsClass(id: string){
    let remaining = this.calculateRemainingTicketsForEvent(id);
    if(remaining <= 10){
      return 'bg-danger';
    }
    else if(remaining<50){
      return 'bg-warning';
    }
    return '';
  }

}
