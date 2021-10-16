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
import {OWL_DATE_TIME_FORMATS, OwlDateTimeModule, OwlNativeDateTimeModule} from "ng-pick-datetime";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgxMaskModule} from "ngx-mask";
import {NgSelectModule} from "@ng-select/ng-select";
import {AlertModule} from "./notifications/alert";
import {TooltipModule} from "ng2-tooltip-directive";
import {NotifierModule} from "angular-notifier";
import {SearchPage} from "./pages/search/search.page";
import {DashboardPage} from "./pages/dashboard/dashboard.page";
import {SalesReportPage} from "./pages/sales-report/sales-report.page";
import {AddVenuePage} from "./pages/events-management/add-venue/add-venue.page";
import {AddPerformerPage} from "./pages/events-management/add-performer/add-performer.page";
import {AgGridModule} from "ag-grid-angular";
import {EventsFiltersComponent} from "./utils/events-filters/events-filters.component";
import {DropdownModule} from "primeng/dropdown";
import {NgxSliderModule} from "@angular-slider/ngx-slider";

const pages = [
  HomePage,
  HeaderPage,
  MusicEventPage,
  BuyTicketPage,
  ShoppingCartPage,
  CheckoutPage,
  LoginPage,
  ManageEventPage,
  AddVenuePage,
  AddPerformerPage,
  SearchPage,
  DashboardPage,
  SalesReportPage
];

const pipes = [
  CustomDatePipe,
  CurrencyConverterPipe
]

const components = [
  AppComponent,
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
  DropdownModule,
  NgxSliderModule,
  TooltipModule,
  AgGridModule.withComponents([]),
  NotifierModule.withConfig({position: {

      horizontal: {
        position: 'right',
        distance: 12
      },
      vertical: {
        position: 'top',
        distance: 12,
        gap: 10
      }
    }
  })
];

export const MY_NATIVE_FORMATS = {
  fullPickerInput: {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'},
  datePickerInput: {year: 'numeric', month: 'numeric', day: 'numeric'},
  timePickerInput: {hour: 'numeric', minute: 'numeric'},
  monthYearLabel: {year: 'numeric', month: 'short'},
  dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
  monthYearA11yLabel: {year: 'numeric', month: 'long'},
};

const providers = [
  MusicEventService,
  OrderManagementService,
  PaymentService,
  AuthService,
  StorageService
];

@NgModule({
  declarations: [...pages, ...components, ...pipes, EventsFiltersComponent],
    imports: [...modules],
  providers: [...providers, CurrencyConverterPipe, {provide:OWL_DATE_TIME_FORMATS, useValue: MY_NATIVE_FORMATS}],
  bootstrap: [...components]
})
export class AppModule {
}
