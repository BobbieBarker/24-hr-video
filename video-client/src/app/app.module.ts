import 'hammerjs';
import 'rxjs';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { MdToolbarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';

import { AuthModule, currentSession } from './auth';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MdToolbarModule,
    StoreModule.forRoot({ currentSession }),
    AuthModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
