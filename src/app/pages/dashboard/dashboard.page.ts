import {Component, OnInit} from "@angular/core";
import {MusicEvent} from "../../interfaces/music-event.interface";
import {MusicEventService} from "../../services/music-event.service";
import {tap} from "rxjs/operators";

@Component({
  templateUrl:'dashboard.page.html',
  styleUrls: ['dashboard.page.css']
})
export class DashboardPage implements OnInit{
  musicEvents: MusicEvent[];

  constructor(private musicEventService: MusicEventService) {
  }

  ngOnInit() {
    this.musicEventService.getAll()
      .pipe(tap(data=>this.musicEvents=data))
      .subscribe();
  }

  deleteEvent(id){
    this.musicEventService.deleteMusicEvent(id)
      .pipe(tap(success=>console.log(success)))
      .subscribe();
    this.musicEventService.getAll().pipe(tap(data=>this.musicEvents=data)).subscribe();
  }
}
