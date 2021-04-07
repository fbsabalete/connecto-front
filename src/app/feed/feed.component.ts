import { PostagemService } from './../service/postagem.service';
import { Postagem } from './../model/Postagem';

import { Component, OnInit, } from '@angular/core';
import { Tema } from '../model/Tema';
import { environment } from 'src/environments/environment.prod';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';



@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})

export class FeedComponent implements OnInit {

  lista;

  postagem: Postagem = new Postagem()
  listaPostagem: Postagem[]
  listaPostagemServico: Postagem[]
  listaPostagemVagas: Postagem[]


  ngOnInit() {
    this.postagens();

  }


  constructor(
    private postagemService: PostagemService,

  ) {
  }

  onLista(){
   this.postagens();
  }

  postagens(){
    this.postagemService.getAllPostagem().subscribe((resp: Postagem[]) => {

      this.listaPostagem = resp
      this.listaPostagemServico = []
      this.listaPostagemVagas = []
      this.listaPostagem.forEach((item)=>{
        if(item.prestadorServicos){
          this.listaPostagemServico.push(item)
        } else {
          this.listaPostagemVagas.push(item)
        }
      })
      this.listaPostagem.reverse()


    })
  }




}


