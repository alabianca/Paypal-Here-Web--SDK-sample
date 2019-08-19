import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CallbackComponent } from './callback/callback.component';
import { HomeComponent } from './home/home.component';
import { SellComponent } from './sell/sell.component';
import { SetupPaypalComponent } from './setup-paypal/setup-paypal.component';


const routes: Routes = [
  {
    path: 'callback',
    component: CallbackComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'sell',
    component: SellComponent,
  },
  {
    path: 'setup',
    component: SetupPaypalComponent,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
