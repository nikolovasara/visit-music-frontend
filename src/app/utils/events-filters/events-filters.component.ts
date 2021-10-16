import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {LabelType, Options} from "@angular-slider/ngx-slider";
import {EventFilter} from "../../models/forms/event-filter.interface";
import {MusicEventService} from "../../services/music-event.service";
import {CountryOption} from "../../interfaces/dropdown/country-option.interface";
import {GenreOption} from "../../interfaces/dropdown/genre-option.interface";
import {FilterComponent} from "ag-grid-community/dist/lib/components/framework/componentTypes";
import {CustomDatePipe} from "../../pipes/custom-date.pipe";

@Component({
  selector:'events-filters',
  templateUrl: 'events-filters.component.html',
  styleUrls: ['events-filters.component.css']
})
export class EventsFiltersComponent implements OnInit{
  filters: EventFilter= new EventFilter();
  countries: CountryOption[];
  selectedCountry: any;
  genres: GenreOption[];
  selectedGenre: any;
  minValue: number = 100;
  maxValue: number = 400;
  options: Options = {
    floor: 0,
    ceil: 500,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return "<b>Min price:</b> $" + value;
        case LabelType.High:
          return "<b>Max price:</b> $" + value;
        default:
          return "$" + value;
      }
    }
  };

  @Output() filterAddedEvent = new EventEmitter();

  constructor(private musicEventsService: MusicEventService) {
    this.countries = [];

    this.genres=[];
  }

  ngOnInit() {
    this.musicEventsService.getAllCountries().subscribe(data=>{
      data.forEach(c=>this.countries.push(new CountryOption(c)));
    });
    this.musicEventsService.getAllGenres().subscribe(data=>{
      data.forEach(c=>this.genres.push(new GenreOption(c)));
    });
  }

  addDate(date){
    this.filters.date = date;
    console.log(date);
    this.filterAddedEvent.emit(this.filters);
  }

  setDateCondition(dateCondition){
    console.log(dateCondition)
    this.filters.dateCondition = dateCondition;
    this.filterAddedEvent.emit(this.filters);
  }

  addCountry(country){
    this.filters.country = country;
    this.filterAddedEvent.emit(this.filters);
    console.log(this.filters);
  }

  addGenre(genre){
    this.filters.genre = genre;
    this.filterAddedEvent.emit(this.filters);
  }

  priceChanged(priceSlider){
    this.filters.price = [];
    this.filters.price.push(priceSlider.value);
    this.filters.price.push(priceSlider.highValue);
    this.filterAddedEvent.emit(this.filters);
    console.log(this.filters);
  }

  addKeyword(kw){
    this.filters.keyword = kw;
    this.filterAddedEvent.emit(this.filters);
  }

  resetFilters(){
    this.filters = new EventFilter();
    this.filterAddedEvent.emit(this.filters);
  }
}
