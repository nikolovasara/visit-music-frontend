import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class PaymentService{
  url = 'http://localhost:9090/api/payment'

  constructor(private _http: HttpClient) {}

  pay(payment: any, stripe: any){
    this._http
      .post(`${this.url}`, payment)
      .subscribe((data: any) => {
        stripe.redirectToCheckout({
          sessionId: data.id,
        });
      });
  }

}
