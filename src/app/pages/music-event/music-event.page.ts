import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {MusicEventService} from "../../services/music-event.service";
import {MusicEvent} from "../../interfaces/music-event.interface";
import {tap} from "rxjs/operators";

@Component({
  templateUrl: 'music-event.page.html',
  styleUrls: ['music-event.page.css']
})
export class MusicEventPage implements OnInit {

  musicEvent: MusicEvent | undefined;

  constructor(private route: ActivatedRoute,
              private musicEventService: MusicEventService) {
  }

  ngOnInit() {
     let musicEventId = this.route.snapshot.paramMap.get('id') as string
     this.musicEventService.getById(musicEventId)
       .pipe(
         tap(event => this.musicEvent = event)
       ).subscribe(_ => console.log(), error => console.log(error))
  }

}
