import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EquipeComponent } from './equipe/equipe.component';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';
import { SaibaMaisComponent } from './saiba-mais/saiba-mais.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { RodapeComponent } from './rodape/rodape.component';

@NgModule({
  declarations: [
    AppComponent,
    EquipeComponent,
    PaginaInicialComponent,
    SaibaMaisComponent,
    LandingPageComponent,
    RodapeComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
