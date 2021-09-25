import {Money} from "../../interfaces/ticket-price.interface";
import {EventTicketForm} from "./event-ticket-form.interface";

export class OrderForm{
  total: Money;
  tickets: EventTicketForm[];

  constructor() {
    this.tickets = [];
  }
}
