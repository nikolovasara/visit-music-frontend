import {Component, OnInit} from "@angular/core";
import {OrderManagementService} from "../../../services/order-management.service";
import {AuthService} from "../../../services/auth.service";
import {StorageService} from "../../../services/storage.service";
import {User} from "../../../interfaces/user.interface";
import {AlertService} from "../../../notifications/alert";
import {ActivatedRoute, Router} from "@angular/router";
import {NotifierService} from "angular-notifier";

@Component({
  selector: 'header',
  templateUrl: 'header.page.html',
  styleUrls: ['header.page.css']
})
export class HeaderPage implements OnInit{
  searchContent = '';
  itemsInCart:number;
  isLoggedIn = false;
  user: User;
  constructor(private orderManagementService:OrderManagementService,
              private authService:AuthService,
              private storageService:StorageService,
              private router: Router,
              private notifierService: NotifierService) {
    this.itemsInCart=0;
    this.isLoggedIn = this.authService.isLoggedIn();
    if(this.isLoggedIn){
      this.user = JSON.parse(this.storageService.getItem('user'));
    }
  }

  ngOnInit() {
    if(this.orderManagementService.getEventsFromShoppingCart()!=null){
      this.itemsInCart=this.orderManagementService.getEventsFromShoppingCart().length;
    }
    this.orderManagementService.cartHeaderIconChange.subscribe(value=>this.itemsInCart=value);
  }

  logout(){
    this.authService.logout();
    this.notifierService.notify('info',"Logged out");
  }

  search(key){
    this.router.navigate(['search'], {queryParams: {q: key}});
  }

}
