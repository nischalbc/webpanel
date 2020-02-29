import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {RouterModule} from '@angular/router';
import { IpConfigurationComponent } from './pages/ip-configuration/ip-configuration.component';
import { LandingComponent } from './pages/landing/landing.component';
import {AppRoutingModule} from './app-routing.module';

@NgModule({
    declarations: [
        AppComponent,
        IpConfigurationComponent,
        LandingComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule
  ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
