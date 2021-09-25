import {Money} from "./ticket-price.interface";
import {Id} from "./id.interface";
import {EventTicket} from "./event-ticket.interface";

export interface Order{
  id: Id;
  createdOn: string;
  total: Money;
  eventTicketList: EventTicket[];
}
