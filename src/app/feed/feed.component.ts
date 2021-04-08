import { TemaService } from './../service/tema.service';
import { PostagemService } from './../service/postagem.service';
import { Postagem } from './../model/Postagem';

import { Component, OnInit } from '@angular/core';
import { Tema } from '../model/Tema';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

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
  listaFiltrada: Postagem[] = [];

  faWhatsapp = faWhatsapp;

  ngOnInit() {
    this.postagens();
    this.checkLength();
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
      this.listaPostagemServico = [];
      this.listaPostagemVagas = [];
      this.listaPostagem.forEach((item) => {
        if (item.prestadorServicos) {
          this.listaPostagemServico.push(item);
        } else {
          this.listaPostagemVagas.push(item);
        }
      });
      this.listaPostagem.reverse();
      this.listaPostagemServico.reverse()
      this.listaPostagemVagas.reverse()
      this.listaFiltrada = this.listaPostagemServico;
    });
  }

  checkLength(){
    if (this.listaFiltro.length > 0) {
      this.listaFiltrada = [];
    }else{
      this.listaFiltrada = this.listaPostagemServico;
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
        if(resp.tema.categoria == e && !this.listaFiltrada.includes(resp)){
          this.listaFiltrada.push(resp)
        }
      })
    })

    if (this.listaFiltro.length == 0) {
      this.listaFiltrada = this.listaPostagemServico;
    }

    // if (event.target.checked) {
    //   this.listaFiltrada = this.listaPostagemServico.filter((resp) => {
    //     this.listaFiltro.forEach((e) => {
    //       if (resp.tema.categoria == e && !this.listaFiltrada.includes(resp)) {
    //         this.listaFiltrada.push(resp);
    //       }
    //     });
    //   });
    // }
  }

  //   this.listaPostagemServico.filter((resp) => {
  //     var igual: boolean
  //     this.listaFiltro.forEach((e) => {
  //       igual = resp.tema.categoria == e;
  //       if(igual)return igual;
  //     })
  //     return igual;
  //   })
  //
  // }
}
