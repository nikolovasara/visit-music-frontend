import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePage} from "./pages/home/home.page";
import {MusicEventPage} from "./pages/music-event/music-event.page";
import {BuyTicketPage} from "./pages/buy-ticket/buy-ticket.page";
import {ShoppingCartPage} from "./pages/shopping-cart/shopping-cart.page";

const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  //TODO duplicate route for filtering events by region
  {
    path: 'music-event/:id',
    component: MusicEventPage
  },
  {
    path: 'buy-ticket',
    component: ShoppingCartPage
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
