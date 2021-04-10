import { PostagemService } from './../service/postagem.service';
import { environment } from 'src/environments/environment.prod';

import { Component, Input, OnInit } from '@angular/core';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { TemaService } from '../service/tema.service';
import { Tema } from '../model/Tema';
import { Postagem } from '../model/Postagem';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-postagem',
  templateUrl: './postagem.component.html',
  styleUrls: ['./postagem.component.css']
})
export class PostagemComponent implements OnInit {
  foto = environment.fotoPerfil
  nome = environment.nomeCompleto
  public comentarios = []
  public textoComentario ;
  clique = false;
  edita = false;
  tema: Tema = new Tema()
  listaTemas: Tema[]
  postagem: Postagem = new Postagem()
  idTema:number
  listaPostagem;
  post: string

  @Input() data:number

  item;

  faThumbsUp = faThumbsUp;
  faComments = faComments;
  faWhatsapp = faWhatsapp;

  listaService: Postagem[];
  subscription: Subscription;

  constructor(
    private temaService: TemaService,
    private postagemService: PostagemService

  ) { }

  ngOnInit(){
    this.subscription = this.postagemService.listaAtualizada.subscribe(resp => this.listaService = resp)
  }

  curtir(){
    document.querySelector('.gostei').classList.add("ativo");
  }

  prestador(event: any){
    if(event.target.value == "buscando"){
      this.postagem.prestadorServicos = false;
    }else{
      this.postagem.prestadorServicos = true;
    }
  }

  findAllTema() {
    this.temaService.getAllTema().subscribe((resp) => {
      this.listaTemas = resp;
    });
  }

  findByIdTema(){
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) => {
      this.tema = resp;
    })
  }

  publicar(){
    let json = JSON.parse(JSON.stringify(this.postagem))
    console.log(json)
    this.postagemService.postPostagem(json).subscribe((resp: Postagem) => {
      this.postagem = resp;


    })
  }

  pegarComentario(){
    this.comentarios.push(this.textoComentario)
  }

  clicado(){
    this.clique = true;
  }

  editar(){
    this.edita = true;
  }

  findByIdPostagem(){
    this.postagem.id = this.idTema
    this.postagemService.getByIdPostagem(this.data).subscribe((resp: Postagem) => {
      this.postagem = resp;


    });
  }



  postagemModal(){

    this.findByIdPostagem();

  }




}
