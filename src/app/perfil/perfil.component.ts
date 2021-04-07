import { PortfolioService } from './../service/portfolio.service';
import { Portfolio } from './../model/Portfolio';
import { AuthService } from './../service/auth.service';
import { Usuario } from './../model/Usuario';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Postagem } from '../model/Postagem';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  idUser: number;
  user: Usuario = new Usuario();
  listaCategoria: string[];

  portfolio: Portfolio = new Portfolio();

  key = 'data';
  reverse = true;

  idLogado = environment.id;
  url = this.router.url.split('/').pop();
  nomeValido: boolean = true;
  emailValido: boolean = true;
  senhaValida: boolean = true;
  fotoValida: boolean = true;
  telefoneValido: boolean = true;

  confirmarSenha: String;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private portfolioService: PortfolioService
  ) {}

  ngOnInit() {
    if (environment.token == '') {
      this.router.navigate(['/entrar']);
    }
    this.idUser = this.route.snapshot.params['id'];

    this.findByIdUser(this.idUser);
  }

  checarUrl() {
    if (this.url == 'portfolio') {
      return true;
    }
    return false;
  }

  listarServicos() {
    this.user.postagem.forEach((resp) => {
      this.listaCategoria = [];
      if (resp.prestadorServicos) {
        this.listaCategoria.push(resp.tema.categoria);
      }
    });
  }

  findByIdUser(id: number) {
    this.authService.getByIdUser(id).subscribe((resp: Usuario) => {
      this.user = resp;
      this.listaCategoria = [];
      resp.postagem.forEach((item) => {
        if (
          item.prestadorServicos &&
          !this.listaCategoria.includes(item.tema.categoria)
        ) {
          this.listaCategoria.push(item.tema.categoria);
        }
      });
    });
  }

  cadastrarPortfolio() {
    this.portfolio.usuario = this.user;
    this.portfolioService.postPortfolio(this.portfolio).subscribe((resp) => {
      this.portfolio = resp;
      this.findByIdUser(this.idUser);
      this.portfolio = new Portfolio();
    });
  }

  findByIdPortfolio(id: number) {
    this.portfolioService.getByIdPortfolio(id).subscribe((resp: Portfolio) => {
      this.portfolio = resp;
    });
  }

  deletarPortfolio() {
    this.portfolioService.deletePortfolio(this.portfolio.id).subscribe(() => {
      this.findByIdUser(this.idUser);
      this.portfolio = new Portfolio();
    });
  }
  /* Metodos validar forms */
  validaNome(event: any) {
    this.nomeValido = this.validation(event.target.value.length < 2, event);
  }

  validaEmail(event: any) {
    this.emailValido = this.validation(
      event.target.value.indexOf('@') == -1 ||
        event.target.value.indexOf('.') == -1,
      event
    );
  }

  validaFoto(event: any) {
    let regex = /\.(jpe?g|png)$/i;
    this.fotoValida = this.validation(
      !regex.test(event.target.value) && event.target.value.length != 0,
      event
    );
  }

  validaTelefone(event: any) {
    this.telefoneValido = this.validation(
      event.target.value.length != 11,
      event
    );
  }

  validaSenha(event: any) {
    this.senhaValida = this.validation(
      event.target.value.length < 5 || event.target.value.length > 12,
      event
    );
  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value;
    this.senhaValida = this.validation(
      this.confirmarSenha != this.user.senha,
      event
    );
  }

  validation(condicao: boolean, event: any) {
    let valid = false;
    if (condicao) {
      event.target.classList.remove('is-valid');
      event.target.classList.add('is-invalid');
    } else {
      event.target.classList.remove('is-invalid');
      event.target.classList.add('is-valid');
      valid = true;
    }
    return valid;
  }
  /* Metodos validar forms */

  /* Metodos de Atualizar */
  atualizar() {
    this.authService.atualizar(this.user).subscribe((resp: Usuario) => {
      this.user = resp;

      alert('Usuario atualizado com sucesso, faça o login novamente.');
      environment.fotoPerfil = '';
      environment.id = 0;
      environment.nomeCompleto = '';
      environment.token = '';

      this.router.navigate(['/entrar']);
    });
  }
  /* Metodos de Atualizar */
}
