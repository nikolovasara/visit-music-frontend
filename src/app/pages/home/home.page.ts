import {Component, OnInit} from "@angular/core";
import {MusicEventService} from "../../services/music-event.service";
import {MusicEvent} from "../../interfaces/music-event.interface";
import {tap} from "rxjs/operators";

@Component({
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.css']
})
export class HomePage implements OnInit{

  musicEvents: MusicEvent[] = [];

  constructor(private musicEventService: MusicEventService) {
  }

  ngOnInit() {
    this.musicEventService.getAll()
      .pipe(
        tap(events => this.musicEvents = events)
      ).subscribe()
  }



}
