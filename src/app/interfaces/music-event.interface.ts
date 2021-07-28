import {MusicPerformer} from "./music-performer.interface";
import {Id} from "./id.interface";
import {Venue} from "./venue.interface";
import {TicketPrice} from "./ticket-price.interface";

export interface MusicEvent{
  id: Id;
  musicEventName: string;
  sales: number;
  venue: Venue;
  ticketPrice: TicketPrice;
  eventTime: Date;
  musicPerformerList: MusicPerformer[];
}
