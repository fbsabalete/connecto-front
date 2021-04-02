import { Usuario } from './../model/Usuario';
import { TemaService } from './../service/tema.service';
import { PostagemService } from './../service/postagem.service';
import { Tema } from './../model/Tema';
import { Postagem } from './../model/Postagem';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-novo-post',
  templateUrl: './novo-post.component.html',
  styleUrls: ['./novo-post.component.css']
})
export class NovoPostComponent implements OnInit {

  foto = environment.fotoPerfil
  user: Usuario = new Usuario()

  postagem: Postagem = new Postagem()

  tema: Tema = new Tema()
  listaTema: Tema[]
  idTema: number

  constructor(
    private postagemService: PostagemService,
    private temaService: TemaService,
    private auth: AuthService
  ) {
  }

  ngOnInit() {
    this.findAllTemas();
  }

  publicar(){
    this.postagem.tema = this.tema;
    this.postagem.usuario = new Usuario();
    this.postagem.usuario.id = environment.id;

    this.postagemService.postPostagem(this.postagem).subscribe((resp) => {
      this.postagem = resp;

      this.postagem = new Postagem();
    })
  }

  findByIdUser(){
    this.auth.getByIdUser(environment.id).subscribe((resp: Usuario) => {
      this.user = resp;
    })
  }

  findAllTemas(){
    this.temaService.getAllTema().subscribe((resp: Tema[]) => {
      this.listaTema = resp;
    })
  }

  findByIdTema(){
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) => {
      this.tema = resp;
    })
  }

  findAllPostagem(){
    this.postagemService.getAllPostagem().subscribe((resp) => {

    })
  }

  prestador(event: any){
    if(event.target.value == "buscando"){
      this.postagem.prestadorServicos = false;
    }else{
      this.postagem.prestadorServicos = true;
    }
  }

  // STYLE
  aparecer() {
    var botao = <HTMLElement>document.querySelector('.botao')
    var sumir = <HTMLElement>document.querySelector('.sumir')
    botao.style.display = "inline-block";
    sumir.style.display = "block";
  }

  cancelar() {
    var botao = <HTMLElement>document.querySelector('.botao')
    var sumir = <HTMLElement>document.querySelector('.sumir')
    botao.style.display = "none";
    sumir.style.display = "none";
  }

}
