import {Component, OnInit} from "@angular/core";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector:'app-footer',
  templateUrl:"footer.page.html",
  styleUrls:["footer.page.css"]
})
export class FooterPage{
  constructor(private authService: AuthService,
              private router: Router) {
    console.log(this.router)
  }

  isLogin(){
    return  this.router.url =="/login";
  }
}
