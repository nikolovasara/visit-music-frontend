import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {MusicEventService} from "../../services/music-event.service";
import {MusicEvent} from "../../interfaces/music-event.interface";
import {tap} from "rxjs/operators";
import {AuthService} from "../../services/auth.service";

@Component({
  templateUrl: 'music-event.page.html',
  styleUrls: ['music-event.page.css']
})
export class MusicEventPage implements OnInit {

  musicEvent: MusicEvent | undefined;
  inCart = false;
  isLoggedIn = false;

  constructor(private route: ActivatedRoute,
              private musicEventService: MusicEventService,
              private authService: AuthService) {
  }

  ngOnInit() {
     let musicEventId = this.route.snapshot.paramMap.get('id') as string
     this.musicEventService.getById(musicEventId)
       .pipe(
         tap(event => this.musicEvent = event)
       ).subscribe(_ => console.log(), error => console.log(error))
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  addToCart(musicEvent){
    console.log(musicEvent);
    this.inCart = true;
  }

  deleteEvent(id){
  /*  this.musicEventService.deleteMusicEvent(id)
      .pipe(tap(success=>console.log(success)))
      .subscribe();
    this.musicEventService.getAll().pipe(tap(data=>this.musicEvents=data)).subscribe();*/
  }

}
