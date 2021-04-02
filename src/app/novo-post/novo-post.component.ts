import { Postagem } from './../model/Postagem';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-novo-post',
  templateUrl: './novo-post.component.html',
  styleUrls: ['./novo-post.component.css']
})
export class NovoPostComponent implements OnInit {

  foto = environment.fotoPerfil

  postagem: Postagem = new Postagem()

  constructor() {
  }

  ngOnInit() {
  }

  publicar(){

  }

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
