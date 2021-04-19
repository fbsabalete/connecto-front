import { CurtirService } from './../service/curtir.service';
import { CurtidaPostagem } from './../model/CurtidaPostagem';
import { ComentarioService } from './../service/comentario.service';
import { ComentarioPostagem } from './../model/ComentarioPostagem';
import { PostagemService } from './../service/postagem.service';
import { environment } from 'src/environments/environment.prod';

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { TemaService } from '../service/tema.service';
import { Tema } from '../model/Tema';
import { Postagem } from '../model/Postagem';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Usuario } from '../model/Usuario';


@Component({
  selector: 'app-postagem',
  templateUrl: './postagem.component.html',
  styleUrls: ['./postagem.component.css']
})
export class PostagemComponent implements OnInit {
  user: Usuario = new Usuario()
  idUserLogado = environment.id

  comentario: ComentarioPostagem = new ComentarioPostagem()
  comentarioLength: number

  curtida: CurtidaPostagem = new CurtidaPostagem()
  postagemCurtida: boolean = false
  curtidas: number

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
  editarModal: boolean



  @Input() data:number

  @Input() editavel:boolean

  @Output() carregaPostagem = new EventEmitter()

  item;

  faThumbsUp = faThumbsUp;
  faComments = faComments;
  faWhatsapp = faWhatsapp;

  listaService: Postagem[];
  subscription: Subscription;

  constructor(
    private temaService: TemaService,
    private postagemService: PostagemService,
    private comentarioService: ComentarioService,
    private curtirService: CurtirService

  ) { }

  ngOnInit(){
    this.findByIdPostagem()
  }


  curtir(){
    if(!this.postagemCurtida) {
      this.postCurtida()
      document.querySelector(`#post-${this.data}`).classList.add("ativo")
      this.curtidas += 1
    } else {
      this.deleteCurtida()
      document.querySelector(`#post-${this.data}`).classList.remove("ativo")
      this.curtidas -= 1
    }
    this.postagemCurtida = !this.postagemCurtida

/*
      this.findByIdPostagem()
      this.carregaPostagem.emit() */
  }

  confCurtir(){
    this.postagem.curtir.forEach((resp: CurtidaPostagem) => {
      if(resp.usuario.id == environment.id) {
        document.querySelector(`#post-${this.data}`).classList.add("ativo")
        this.postagemCurtida = true
        this.curtida = resp
      }

    })
  }

  postCurtida(){

    this.curtida.usuario = new Usuario()
    this.curtida.usuario.id = this.idUserLogado
    this.curtida.postagem = new Postagem()
    this.curtida.postagem.id = this.data

   /*  this.curtida.usuario = this.user
    this.curtida.postagem = this.postagem */
    this.curtirService.postCurtidas(this.curtida).subscribe((resp)=>{
      this.curtida = resp
    })
  }

  deleteCurtida(){
    this.curtirService.deleteCurtida(this.curtida.id).subscribe(()=>{
    })
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
    this.postagem.tema = new Tema();
    this.postagem.tema.id = this.tema.id
    this.postagem.usuario = new Usuario();
    this.postagem.usuario.id = environment.id;
    this.postagem.comentario = []
    this.postagem.curtir = []
    this.postagemService.putPostagem(this.postagem).subscribe((resp: Postagem) => {
      this.postagem = resp;
      this.carregaPostagem.emit()

      Swal.fire({
        icon: 'success',
        title: 'Postagem realizada com sucesso ',
        showConfirmButton: false,
        timer: 1500
  })
        }, erro => {
          Swal.fire({
            icon: 'error',
            title: 'Não foi possível publicar essa postagem',
            showConfirmButton: false,
            timer: 1500
      })
    })
  }

  pegarComentario(){
    this.comentarios.push(this.textoComentario)
  }

  clicado(){
    (<any>$(`#comentario-${this.data}`)).collapse('toggle');
  }

  sumir(){
    (<any>$(`#comentario-${this.data}`)).collapse('hide');
  }

  findByIdPostagem(){
    this.postagem.id = this.data
    this.postagemService.getByIdPostagem(this.data).subscribe((resp: Postagem) => {
      this.postagem = resp;
      this.confCurtir()
      this.idDiferente()
      this.curtidas = this.postagem.curtir.length
      this.comentarioLength = this.postagem.comentario.length


    });
  }

  postagemModal(){
    this.findByIdPostagem();
  }

  excluirPostagem(){
    this.postagemService.deletePostagem(this.postagem.id).subscribe(()=> {
      this.carregaPostagem.emit()

      Swal.fire({
        icon: 'success',
        title: 'Essa postagem foi excluída com sucesso',
        showConfirmButton: false,
        timer: 1500
  })
        }, erro => {
          Swal.fire({
            icon: 'error',
            title: 'Não excluir essa postagem',
            showConfirmButton: false,
            timer: 1500
      })
    })
  }

  idDiferente(){
    if ( this.postagem.usuario.id == environment.id && this.editavel) {
      this.editarModal = true
    } else {
      this.editarModal = false
    }
    if(environment.tipoAdmin == "adm"){
      this.editarModal = true
    }
  }

  findAllPostagens(){
    this.postagemService.getAllPostagem().subscribe((resp: Postagem[])=>{
      this.listaPostagem = resp
    })
  }

  comentar(id: number){
    this.comentario.usuario = new Usuario()
    this.comentario.usuario.id = this.idUserLogado;

    this.comentario.postagem = new Postagem()
    this.comentario.postagem.id = this.data

   this.comentarioService.postComentario(this.comentario).subscribe((resp: ComentarioPostagem) => {
     this.comentario = resp
     this.comentario = new ComentarioPostagem()
     this.findByIdPostagem()

     this.carregaPostagem.emit()
   })

  }

  apagarComentario(id: number){
    this.comentarioService.deleteComentario(id).subscribe(()=>{
      Swal.fire({
        icon: 'success',
        title: 'Muito bom',
        text: 'Comentario apagado com sucesso!',
        showConfirmButton: false,
        timer: 2000
      })
       this.findAllPostagens()
       this.findByIdPostagem()
       this.carregaPostagem.emit()
    })
  }




}
