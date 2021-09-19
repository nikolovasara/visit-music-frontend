import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePage} from "./pages/home/home.page";
import {MusicEventPage} from "./pages/music-event/music-event.page";
import {BuyTicketPage} from "./pages/buy-ticket/buy-ticket.page";
import {ShoppingCartPage} from "./pages/shopping-cart/shopping-cart.page";
import {LoginPage} from "./pages/login/login.page";
import {ManageEventPage} from "./pages/events-management/add-event/manage-event.page";
import {SearchPage} from "./pages/search/search.page";
import {DashboardPage} from "./pages/dashboard/dashboard.page";

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
  },
  {
    path: 'manage-event/:id',
    component: ManageEventPage
  },
  {
    path: 'manage-event',
    component: ManageEventPage
  },
  {
    path: 'search',
    component: SearchPage
  },
  {
    path: 'dashboard',
    component: DashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
