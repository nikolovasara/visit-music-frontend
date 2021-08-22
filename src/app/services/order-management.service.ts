import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {MusicEvent} from "../interfaces/music-event.interface";

@Injectable()
export class OrderManagementService {
  url = 'http://localhost:9091/api/orders'

  constructor(private _http: HttpClient) {}

  increaseTicketsSales(details: any) {
    const headers = { 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' };
    return this._http.post<any>('http://localhost:9091/api/orders/sales/increase', details)
  }

}
