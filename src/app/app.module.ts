import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MenuLateralComponent } from './menu-lateral/menu-lateral.component';
import { FeedComponent } from './feed/feed.component';
import { PostagemComponent } from './postagem/postagem.component';
import { NovoPostComponent } from './novo-post/novo-post.component';
import { AmigosComponent } from './amigos/amigos.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuLateralComponent,
    FeedComponent,
    PostagemComponent,
    NovoPostComponent,
    AmigosComponent

  ],
  imports: [
    BrowserModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
