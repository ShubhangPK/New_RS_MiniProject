import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule }    from '@angular/forms';
import { fakeBackendProvider } from './_helpers';
import {AlertService} from './_services';

import { routing }        from './app.routing';

import { AlertComponent } from './_components';

import { AppComponent }         from './app.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { HeroDetailComponent }  from './hero-detail/hero-detail.component';
import { HeroesComponent }      from './heroes/heroes.component';
import { MessagesComponent }    from './messages/messages.component';


import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AppRoutingModule }     from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
;

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    routing,
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    AlertComponent,
    LoginComponent,
    DashboardComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    RegisterComponent,

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    AlertService,

    // provider used to create fake backend
    fakeBackendProvider
],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
