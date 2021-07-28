import {Location} from "./location.interface";

export interface Venue {
  maxAllowedNumberOfVisitors: number;
  locationType: string;
  location: Location;
}
