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

const pages = [
  HomePage,
  HeaderPage,
  MusicEventPage,
  BuyTicketPage,
  ShoppingCartPage
];

const pipes = [
  CustomDatePipe
]

const components = [
  AppComponent
];

const modules = [
  BrowserModule,
  AppRoutingModule,
  HttpClientModule,
  ReactiveFormsModule
];

const providers = [
  MusicEventService,
  PaymentService
];

@NgModule({
  declarations: [...pages, ...components, ...pipes],
    imports: [...modules, FormsModule],
  providers: [...providers],
  bootstrap: [...components]
})
export class AppModule {
}
