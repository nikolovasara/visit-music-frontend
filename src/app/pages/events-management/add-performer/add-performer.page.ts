import {Component, OnInit} from "@angular/core";
import {VenueForm} from "../../../models/forms/venue-form.interface";
import {LocationType} from "../../../interfaces/venue.interface";
import {MusicEventService} from "../../../services/music-event.service";
import {tap} from "rxjs/operators";
import {PerformerForm} from "../../../models/forms/performer-form.interface";
import {Genre} from "../../../interfaces/music-performer.interface";
import {NotifierService} from "angular-notifier";


@Component({
  templateUrl: 'add-performer.page.html',
  styleUrls: ['add-performer.page.css']
})
export class AddPerformerPage implements OnInit{
  performerForm = new PerformerForm();
  genres = [];

  constructor(private performerService: MusicEventService,
              private notifierService: NotifierService) {
  }

  ngOnInit() {
    this.performerForm = new PerformerForm();
    for (const type in Genre) {
      if (isNaN(Number(type))) {
        this.genres.push(type);
      }
    }
    console.log(this.genres)
  }

  createPerformer(performerForm: PerformerForm){
    this.performerService.createPerformer(performerForm)
      .pipe(tap(data=>{
        console.log(data)
        this.notifierService.notify('success','Music Performer successfully added.')
        this.performerForm = new PerformerForm();
      }))
      .subscribe();
  }

  readSelectedType(type){
    console.log(type)
    this.performerForm.genre = type;
  }
}
