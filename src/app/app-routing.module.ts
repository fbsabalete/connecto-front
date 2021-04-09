import { SobreNosComponent } from './sobre-nos/sobre-nos.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { InicioComponent } from './inicio/inicio.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { PerfilComponent } from './perfil/perfil.component';


const routes: Routes = [
  { path: '' , component: LandingPageComponent },
  { path: 'entrar', component: LoginComponent},
  { path: 'cadastrar', component: CadastrarComponent},
  { path: 'feed', component: InicioComponent },
  { path: 'perfil/:id', component: PerfilComponent},
  { path: 'perfil/:id/portfolio', component: PerfilComponent},
  { path: 'sobre-nos', component: SobreNosComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
