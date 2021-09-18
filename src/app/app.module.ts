import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomePage} from "./pages/home/home.page";
import {HeaderPage} from "./pages/layout/header/header.page";
import {HttpClientModule} from "@angular/common/http";
import {MusicEventService} from "./services/music-event.service";
import {MusicEventPage} from "./pages/music-event/music-event.page";
import {BuyTicketPage} from "./pages/buy-ticket/buy-ticket.page";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PaymentService} from "./services/payment.service";
import {CustomDatePipe} from "./pipes/custom-date.pipe";
import {ShoppingCartPage} from "./pages/shopping-cart/shopping-cart.page";
import {OrderManagementService} from "./services/order-management.service";
import {CurrencyConverterPipe} from "./pipes/currency-converter.pipe";
import {JwPaginationModule} from "jw-angular-pagination";
import {CheckoutPage} from "./pages/checkout/checkout.page";
import {LoginPage} from "./pages/login/login.page";
import {AuthService} from "./services/auth.service";
import {StorageService} from "./services/storage.service";
import {ManageEventPage} from "./pages/events-management/add-event/manage-event.page";
import {OwlDateTimeModule, OwlNativeDateTimeModule} from "ng-pick-datetime";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgxMaskModule} from "ngx-mask";
import {NgSelectModule} from "@ng-select/ng-select";
import {AlertModule} from "./notifications/alert";
import {TooltipModule} from "ng2-tooltip-directive";
import {NotifierModule} from "angular-notifier";

const pages = [
  HomePage,
  HeaderPage,
  MusicEventPage,
  BuyTicketPage,
  ShoppingCartPage,
  CheckoutPage,
  LoginPage,
  ManageEventPage
];

const pipes = [
  CustomDatePipe,
  CurrencyConverterPipe
]

const components = [
  AppComponent
];

const modules = [
  BrowserModule,
  BrowserAnimationsModule,
  AppRoutingModule,
  HttpClientModule,
  ReactiveFormsModule,
  FormsModule,
  AlertModule,
  JwPaginationModule,
  OwlDateTimeModule,
  OwlNativeDateTimeModule,
  NgxMaskModule.forRoot(),
  NgSelectModule,
  TooltipModule,
  NotifierModule
];

const providers = [
  MusicEventService,
  OrderManagementService,
  PaymentService,
  AuthService,
  StorageService
];

@NgModule({
  declarations: [...pages, ...components, ...pipes],
    imports: [...modules],
  providers: [...providers, CurrencyConverterPipe],
  bootstrap: [...components]
})
export class AppModule {
}
