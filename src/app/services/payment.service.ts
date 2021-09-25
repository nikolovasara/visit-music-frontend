import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class PaymentService{
  url = 'http://localhost:9091/api/payment'

  constructor(private _http: HttpClient) {}

  pay(amount: number, token: string, currency: string) : Observable<any>{
    return this._http.post<any>(`${this.url}`, {amount: amount, token: token, currency: currency});
  }
}
