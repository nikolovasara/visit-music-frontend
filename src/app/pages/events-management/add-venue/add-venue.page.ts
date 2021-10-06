import {Component, OnInit} from "@angular/core";
import {VenueForm} from "../../../models/forms/venue-form.interface";
import {LocationType} from "../../../interfaces/venue.interface";
import {MusicEventService} from "../../../services/music-event.service";
import {tap} from "rxjs/operators";


@Component({
  templateUrl: 'add-venue.page.html',
  styleUrls: ['add-venue.page.css']
})
export class AddVenuePage implements OnInit{
  venueForm = new VenueForm();
  locationTypes = [];

  constructor(private venueService: MusicEventService) {
  }

  ngOnInit() {
    this.venueForm = new VenueForm();
    this.venueForm.location = {city:'', country: '', locationAddress: ''}
    for (const type in LocationType) {
      if (isNaN(Number(type))) {
        this.locationTypes.push(type);
      }
    }
    console.log(this.locationTypes)
  }

  createVenue(venueForm: VenueForm){
    this.venueService.createVenue(venueForm)
      .pipe(tap(data=>{
        console.log(data)
        this.venueForm = new VenueForm();
        this.venueForm.location = {city:'', country: '', locationAddress: ''}
      }))
      .subscribe();
  }

  readSelectedType(type){
    console.log(type)
    this.venueForm.locationType = type;
  }
}
