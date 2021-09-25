import {Money} from "../../interfaces/ticket-price.interface";

export class MusicEventForm {
  musicEventName: string;
  maxAllowedNumberOfVisitors: number;
  venueId: string;
  eventTime: string;
  ticketPrice: Money;
  sales: number;
  musicPerformerIds: string[];
  constructor() {
    this.sales=0;
    this.ticketPrice = {amount: 0.00, currency:"EUR"};
  }
}
