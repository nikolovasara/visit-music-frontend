import {Location} from "./location.interface";
import {Id} from "./id.interface";

export interface Venue {
  id: Id;
  maxAllowedNumberOfVisitors: number;
  locationType: LocationType;
  location: Location;
}

export enum LocationType{
  PARK, COFFEE_BAR, HALL, STADIUM, OUTDOOR, THEATRE
}
