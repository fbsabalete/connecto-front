import { environment } from 'src/environments/environment.prod';
import { PortfolioService } from './../service/portfolio.service';
import { Portfolio } from './../model/Portfolio';
import { AuthService } from './../service/auth.service';
import { Usuario } from './../model/Usuario';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Postagem } from '../model/Postagem';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  idUser: number
  user: Usuario = new Usuario()
  listaCategoria: string[]

  portfolio: Portfolio = new Portfolio()

  key = 'data';
  reverse = true;

  idLogado = environment.id
  url = this.router.url.split('/').pop();

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private portfolioService: PortfolioService
    ) { }

  ngOnInit(){
    this.idUser = this.route.snapshot.params['id']

    this.findByIdUser(this.idUser)
  }

  checarUrl(){
    if(this.url == "portfolio"){
      return true;
    }
    return false;
  }

  listarServicos(){
    this.user.postagem.forEach((resp) =>{
      this.listaCategoria = []
      if(resp.prestadorServicos){
        this.listaCategoria.push(resp.tema.categoria)
      }
    })
  }


  findByIdUser(id: number){
    this.authService.getByIdUser(id).subscribe((resp: Usuario) =>{
      this.user = resp
      this.listaCategoria = []
      resp.postagem.forEach((item) =>{
        if(item.prestadorServicos && !this.listaCategoria.includes(item.tema.categoria)){
          this.listaCategoria.push(item.tema.categoria)
        }
      })
    })
  }

  cadastrarPortfolio(){
    this.portfolio.usuario = this.user
    this.portfolioService.postPortfolio(this.portfolio).subscribe((resp) =>{
      this.portfolio = resp;
      this.findByIdUser(this.idUser)
      this.portfolio = new Portfolio()
    })
  }

  findByIdPortfolio(id:number){
    this.portfolioService.getByIdPortfolio(id).subscribe((resp: Portfolio)=>{
      this.portfolio = resp
    })
  }

  deletarPortfolio(){
    this.portfolioService.deletePortfolio(this.portfolio.id).subscribe(()=>{

      this.findByIdUser(this.idUser)
      this.portfolio = new Portfolio()
    })


  }
}
