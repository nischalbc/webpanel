import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {RouterModule} from '@angular/router';
import { IpConfigurationComponent } from './pages/ip-configuration/ip-configuration.component';
import { LandingComponent } from './pages/landing/landing.component';
import {AppRoutingModule} from './app-routing.module';
import { UserTypeSelectComponent } from './core/components/user-type-select/user-type-select.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent,
        IpConfigurationComponent,
        LandingComponent,
        UserTypeSelectComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
