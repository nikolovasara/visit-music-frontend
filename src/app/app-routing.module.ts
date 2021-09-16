import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePage} from "./pages/home/home.page";
import {MusicEventPage} from "./pages/music-event/music-event.page";
import {BuyTicketPage} from "./pages/buy-ticket/buy-ticket.page";
import {ShoppingCartPage} from "./pages/shopping-cart/shopping-cart.page";
import {LoginPage} from "./pages/login/login.page";

const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path:'macedonia',
    component: HomePage
  },
  {
    path:'world',
    component:HomePage
  },
  {
    path: 'music-event/:id',
    component: MusicEventPage
  },
  {
    path: 'shopping-cart',
    component: ShoppingCartPage
  },
  {
    path: 'buy',
    component: BuyTicketPage
  },
  {
    path: 'login',
    component: LoginPage
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
