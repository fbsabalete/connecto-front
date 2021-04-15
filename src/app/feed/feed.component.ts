import { environment } from 'src/environments/environment.prod';

import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { TemaService } from './../service/tema.service';
import { PostagemService } from './../service/postagem.service';
import { Postagem } from './../model/Postagem';

import { Component, OnInit } from '@angular/core';
import { Tema } from '../model/Tema';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements OnInit {
  lista;


  postagem: Postagem = new Postagem();
  listaPostagem: Postagem[];
  listaPostagemServico: Postagem[];
  listaPostagemVagas: Postagem[];

  listaFiltro: string[] = [];
  listaTemas: Tema[];
  listaFiltradaServico: Postagem[] = [];
  listaFiltradaVagas: Postagem [] = [];
  faWhatsapp = faWhatsapp;

  carregaPostagem;

  listaService: Postagem[];
  subscription: Subscription;

  ngOnInit() {
    this.postagens();
    window.scroll(0,0);
    this.checkLength();
    this.subscription = this.postagemService.listaAtualizada.subscribe(resp => this.listaService = resp)


  }

  constructor(
    private postagemService: PostagemService,
    private temaService: TemaService
  ) {}

  findAllTema() {
    this.temaService.getAllTema().subscribe((resp) => {
      this.listaTemas = resp;


    });
  }

  onLista() {
    this.postagens();

  }

  postagens() {
    this.postagemService.getAllPostagem().subscribe((resp: Postagem[]) => {
      this.listaPostagem = resp;
      this.listaPostagem.reverse();

      this.listaPostagemServico = [];
      this.listaPostagemVagas = [];
      this.listaPostagem.forEach((item) => {
        if (item.prestadorServicos) {
          this.listaPostagemServico.push(item);
        } else {
          this.listaPostagemVagas.push(item);
        }
      });

      this.listaFiltradaServico = this.listaPostagemServico;
      this.listaFiltradaVagas = this.listaPostagemVagas;

    });
  }

  checkLength(){
    if (this.listaFiltro.length > 0) {
      this.listaFiltradaServico = [];
      this.listaFiltradaVagas = [];
    }else{
      this.listaFiltradaServico = this.listaPostagemServico;
      this.listaFiltradaVagas = this.listaPostagemVagas;
    }
  }

  atualizarFiltros(event: any) {
    if(event.target.checked){
      if(!this.listaFiltro.includes(event.target.value)){
        this.listaFiltro.push(event.target.value)
      }
    }else{
      if(this.listaFiltro.includes(event.target.value)){
        this.listaFiltro.splice(this.listaFiltro.indexOf(event.target.value) , 1)
      }
    }
    this.checkLength();

    this.listaPostagemServico.forEach((resp) => {
      this.listaFiltro.forEach((e) => {
        if(resp.tema.categoria == e && !this.listaFiltradaServico.includes(resp)){
          this.listaFiltradaServico.push(resp)
        }
      })
    })
    
    this.listaPostagemVagas.forEach((resp) => {
      this.listaFiltro.forEach((e) => {
        if(resp.tema.categoria == e && !this.listaFiltradaVagas.includes(resp)){
          this.listaFiltradaVagas.push(resp)
        }
      })
    })

    if (this.listaFiltro.length == 0) {
      this.listaFiltradaServico = this.listaPostagemServico;
      this.listaFiltradaVagas = this.listaPostagemVagas;
    }
  }

  limparFiltros(){
    this.listaFiltro = [];
    this.checkLength()
    var checkboxes = document.querySelectorAll("input[type=checkbox]:checked");
    checkboxes.forEach((resp: HTMLInputElement) => {
      resp.checked = false;
    })
  }
}
