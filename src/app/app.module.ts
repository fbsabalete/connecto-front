import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MenuLateralComponent } from './menu-lateral/menu-lateral.component';
import { FeedComponent } from './feed/feed.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuLateralComponent,
    FeedComponent

  ],
  imports: [
    BrowserModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
