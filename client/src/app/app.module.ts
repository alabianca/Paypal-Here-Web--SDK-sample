import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CallbackComponent } from './callback/callback.component';
import { SellComponent } from './sell/sell.component';
import { HomeComponent } from './home/home.component';
import { SetupPaypalComponent } from './setup-paypal/setup-paypal.component';
import { IdentityService } from './identity.service';
import { ItemComponent } from './item/item.component';

@NgModule({
  declarations: [
    AppComponent,
    CallbackComponent,
    SellComponent,
    HomeComponent,
    SetupPaypalComponent,
    ItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    IdentityService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
