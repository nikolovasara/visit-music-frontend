import {Component, OnInit} from "@angular/core";
import {OrderManagementService} from "../../../services/order-management.service";

@Component({
  selector: 'header',
  templateUrl: 'header.page.html',
  styleUrls: ['header.page.css']
})
export class HeaderPage implements OnInit{
  itemsInCart:number;
  constructor(private orderManagementService:OrderManagementService) {
    this.itemsInCart=0;
  }

  ngOnInit() {
    this.itemsInCart=this.orderManagementService.getEventsFromShoppingCart().length;
    this.orderManagementService.cartHeaderIconChange.subscribe(value=>this.itemsInCart=value);
  }


}
