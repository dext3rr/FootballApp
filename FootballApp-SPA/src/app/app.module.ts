import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
<<<<<<< HEAD

import { AppComponent } from './app.component';
import { ValueComponent } from './value/value.component';
=======
import {FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { ValueComponent } from './value/value.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
>>>>>>> ef3a1da

@NgModule({
   declarations: [
      AppComponent,
<<<<<<< HEAD
      ValueComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule
   ],
   providers: [],
=======
      ValueComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule
   ],
   providers: [
      AuthService
   ],
>>>>>>> ef3a1da
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
