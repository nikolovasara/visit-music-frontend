import {Location} from "./location.interface";
import {Id} from "./id.interface";

export interface Venue {
  id: Id;
  maxAllowedNumberOfVisitors: number;
  locationType: string;
  location: Location;
}
