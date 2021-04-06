import { PostNewComponent } from './feed/post-new/post-new.component';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EquipeComponent } from './equipe/equipe.component';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';
import { SaibaMaisComponent } from './saiba-mais/saiba-mais.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { RodapeComponent } from './rodape/rodape.component';
import { LoginComponent } from './login/login.component';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { AppRoutingModule } from './app-routing.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuLateralComponent } from './menu-lateral/menu-lateral.component';
import { FeedComponent } from './feed/feed.component';
import { PostagemComponent } from './postagem/postagem.component';
import { NovoPostComponent } from './novo-post/novo-post.component';
import { AmigosComponent } from './amigos/amigos.component';
import { InicioComponent } from './inicio/inicio.component';


@NgModule({
  declarations: [
    AppComponent,
    EquipeComponent,
    PaginaInicialComponent,
    SaibaMaisComponent,
    LandingPageComponent,
    RodapeComponent,
    LoginComponent,
    CadastrarComponent,
    MenuLateralComponent,
    FeedComponent,
    PostagemComponent,
    NovoPostComponent,
    AmigosComponent,
    InicioComponent,
    PostNewComponent

  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
