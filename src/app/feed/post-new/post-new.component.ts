import { Tema } from './../../model/Tema';
import { Postagem } from './../../model/Postagem';
import { Usuario } from './../../model/Usuario';
import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { PostagemService } from '../.././service/postagem.service';
import {  AuthService } from '../.././service/auth.service';
import {  TemaService } from '../.././service/tema.service';
import { environment } from 'src/environments/environment.prod';







@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.css']
})
export class PostNewComponent implements OnInit {

  foto = environment.fotoPerfil
  user: Usuario = new Usuario()

  postagem: Postagem = new Postagem()

  tema: Tema = new Tema()
  listaTema: Tema[]
  idTema: number

  @Output() lista = new EventEmitter()

  constructor(
    private postagemService: PostagemService,
    private temaService: TemaService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.findAllTemas()

  }

  publicar(){
    this.postagem.tema = this.tema;
    this.postagem.usuario = new Usuario();
    this.postagem.usuario.id = environment.id;

    this.postagemService.postPostagem(this.postagem).subscribe((resp) => {
      this.postagem = resp;
      this.postagem = new Postagem();
      this.lista.emit()

    })
  }

  cadastrarTema(){
    this.temaService.postTema(this.tema).subscribe((resp) => {
      this.tema = resp;
      this.tema = new Tema();
      this.findAllTemas();
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

  prestador(event: any){
    if(event.target.value == "buscando"){
      this.postagem.prestadorServicos = false;
    }else{
      this.postagem.prestadorServicos = true;
    }
  }

  zerarCategoria(){
    this.tema = new Tema();
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
