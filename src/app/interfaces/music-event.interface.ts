import {MusicPerformer} from "./music-performer.interface";
import {Id} from "./id.interface";
import {Venue} from "./venue.interface";
import {Money} from "./ticket-price.interface";

export interface MusicEvent{
  id: Id;
  musicEventName: string;
  sales: number;
  venue: Venue;
  ticketPrice: Money;
  eventTime: Date;
  musicPerformerList: MusicPerformer[];
}
