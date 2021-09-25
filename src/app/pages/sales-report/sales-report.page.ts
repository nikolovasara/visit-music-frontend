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

@Component({
  templateUrl: 'sales-report.page.html',
  styleUrls: ['sales-report.page.css']
})
export class SalesReportPage implements OnInit{
  public orders: Order[];
  constructor(private orderService: OrderManagementService,
              private musicEventService: MusicEventService) {
  }

  ngOnInit(): void{
    this.orderService.getAllOrders().pipe(tap(data=>{
      this.orders = data
      console.log(this.orders);
    }))
      .subscribe();

  }
}
