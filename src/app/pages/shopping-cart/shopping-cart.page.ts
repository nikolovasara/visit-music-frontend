import {Component, Input, OnInit} from "@angular/core";
import {MusicEvent} from "../../interfaces/music-event.interface";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  templateUrl:'shopping-cart.page.html',
  styleUrls: ['shopping-cart.page.css']
})
export class ShoppingCartPage implements OnInit{
  musicEvent: MusicEvent | any;
  @Input()
  totalTickets: Number = 1;

  constructor(private router: Router, private activatedRoute:ActivatedRoute) {

    this.musicEvent= this.router.getCurrentNavigation().extras.state;
  }

  ngOnInit() {
    console.log(this.musicEvent);
  }

  updateTicketsNumber(){

  }
}
