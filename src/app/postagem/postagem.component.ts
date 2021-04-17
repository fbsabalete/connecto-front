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
    private comentarioService: ComentarioService

  ) { }

  ngOnInit(){
    this.idDiferente()
    this.findByIdPostagem()
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
    this.postagem.tema = this.tema;
    this.postagem.usuario = new Usuario();
    this.postagem.usuario.id = environment.id;
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
    (<any>$(".collapse")).collapse('show');
  }

  sumir(){
    (<any>$(".collapse")).collapse('hide');
  }

  findByIdPostagem(){
    this.postagem.id = this.data
    this.postagemService.getByIdPostagem(this.data).subscribe((resp: Postagem) => {
      this.postagem = resp;



    });
  }

  postagemModal(){
    this.findByIdPostagem();
  }


  excluirPostagem(){
    this.postagemService.deletePostagem(this.data).subscribe(()=> {
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
    this.postagemService.getByIdPostagem(this.data).subscribe((resp: Postagem) => {
      this.postagem = resp;
      if ( this.postagem.usuario.id == environment.id) {
        this.editarModal = true
      } else {
        this.editarModal = false
      }



    });

  }

  findAllPostagens(){
    this.postagemService.getAllPostagem().subscribe((resp: Postagem[])=>{
      this.listaPostagem = resp
    })
  }

  comentar(id: number){
   this.user.id = this.idUserLogado;
   this.comentario.usuario = this.user

   this.postagem.id = id;
   this.comentario.postagem = this.postagem

   this.comentarioService.postComentario(this.comentario).subscribe((resp: ComentarioPostagem) => {
     this.comentario = resp
    /*  console.log(resp) */
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
