import { environment } from './../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faFacebook, faGooglePlus, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { AuthService } from '../service/auth.service';
import { UsuarioLogin } from '../model/UsuarioLogin';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  faFacebook = faFacebook;
  faLinkedin = faLinkedin;
  faGoogle  = faGooglePlus;

  user: UsuarioLogin = new UsuarioLogin()
  constructor(
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
  }


  logar(){
    this.auth.entrar(this.user).subscribe((resp: UsuarioLogin)=>{
      this.user = resp

      environment.fotoPerfil = this.user.fotoPerfil
      environment.id  = this.user.id
      environment.nomeCompleto = this.user.nomeCompleto
      environment.tipoAdmin = this.user.tipoAdmin
      environment.token = this.user.token

      this.router.navigate(['/feed'])

    } ,erro => {
      if(erro.status == 500 ){
        alert('Email ou senha incorreta')
      }
    })
  }
}
