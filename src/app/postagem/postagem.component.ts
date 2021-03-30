import { Component, OnInit } from '@angular/core';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';


@Component({
  selector: 'app-postagem',
  templateUrl: './postagem.component.html',
  styleUrls: ['./postagem.component.css']
})
export class PostagemComponent implements OnInit {

  faThumbsUp = faThumbsUp;
  faComments = faComments;
  faWhatsapp = faWhatsapp;

  constructor() { }

  ngOnInit(): void {
  }

  curtir(){
    document.querySelector('.gostei').classList.add("ativo");
  }

}
