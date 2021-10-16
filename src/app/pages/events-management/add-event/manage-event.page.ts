import {Component, OnInit} from "@angular/core";
import {MusicPerformer} from "../../../interfaces/music-performer.interface";
import {MusicEventService} from "../../../services/music-event.service";
import {tap} from "rxjs/operators";
import {Venue} from "../../../interfaces/venue.interface";
import {MusicEventForm} from "../../../models/forms/music-event-form.interface";
import {AlertService} from "../../../notifications/alert";
import {ActivatedRoute} from "@angular/router";
import {MusicEvent} from "../../../interfaces/music-event.interface";
import {NotifierService} from "angular-notifier";

@Component({
  templateUrl: './manage-event.page.html',
  styleUrls: ['./manage-event.page.css']
})
export class ManageEventPage implements OnInit {

  eventCreation = true;
  musicPerformers: MusicPerformer[];
  selectedMusicPerformersId: string[];
  venues: Venue[];
  selectedVenueId: string;
  ready: number;
  todayDate = new Date();
  musicEventForm: MusicEventForm = new MusicEventForm();

  constructor(private musicEventService: MusicEventService,
              private notifierService: NotifierService,
              private route: ActivatedRoute) {
  }

  ngOnInit(){
    if(this.route.snapshot.paramMap.get('id')){
      let musicEventId = this.route.snapshot.paramMap.get('id') as string
      this.musicEventService.getById(musicEventId)
        .pipe(tap(data=>{
          this.populateForm(data);
          this.eventCreation = false;
        }))
        .subscribe();
    }
    this.ready=0;
    this.musicEventService.getAllMusicPerformers()
      .pipe(tap(data => {
        this.musicPerformers = data
        this.musicPerformers.sort((a,b)=>(a.performerName>b.performerName?1:-1))
        console.log(this.musicPerformers);
        if(data){
          this.ready++;
        }
      }))
      .subscribe();
    this.musicEventService.getAllVenues()
      .pipe(tap(data => {
        this.venues = data
        this.venues.sort((a,b)=>(a.location.locationAddress>b.location.locationAddress?1:-1))
        console.log(this.venues);
        if(data) {
          +this.ready++;
        }
      }))
      .subscribe();
  }

  readSelectedMusicPerformers(event:any){
    this.selectedMusicPerformersId = event;
    console.log(event);
  }

  readSelectedVenue(event:any){
    this.selectedVenueId = event;
    console.log(event);
  }

  createEvent(musicEvent){
    console.log("DATA: ", musicEvent)
    this.musicEventForm=musicEvent;
    this.musicEventService.createMusicEvent(this.musicEventForm)
      .pipe(tap(data=>{
        console.log(data)
        this.notifierService.notify('success','Music event successfully created.')
        this.musicEventForm = new MusicEventForm();
      }, err => {
        this.notifierService.notify("error", "An Error occurred. Please fill in the data in the right format.")
      }))
      .subscribe();
  }

  updateEvent(musicEvent){
    this.musicEventForm=musicEvent;
    let musicEventId = this.route.snapshot.paramMap.get('id') as string;
    this.musicEventService.updateMusicEvent(musicEventId,this.musicEventForm)
      .pipe(tap(data=>{
        console.log(data)
        this.notifierService.notify("success","Music Event successfully updated")
      }, err => {
        this.notifierService.notify('error',"An Error occurred. Please fill in the data in the right format.")
      }))
      .subscribe();
  }

  private populateForm(data: MusicEvent) {
    this.musicEventForm.musicEventName = data.musicEventName;
    this.musicEventForm.eventTime = data.eventTime.toLocaleString();
    this.musicEventForm.sales = data.sales;
    this.musicEventForm.ticketPrice = data.ticketPrice;
    this.musicEventForm.venueId = data.venue.id.id;
    this.selectedVenueId = this.musicEventForm.venueId;
    this.musicEventForm.musicPerformerIds = [];
    data.musicPerformerList.forEach(mp=>this.musicEventForm.musicPerformerIds.push(mp.id.id));
    this.selectedMusicPerformersId = this.musicEventForm.musicPerformerIds;
  }
}
