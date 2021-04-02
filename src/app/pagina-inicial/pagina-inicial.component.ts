import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagina-inicial',
  templateUrl: './pagina-inicial.component.html',
  styleUrls: ['./pagina-inicial.component.css']
})
export class PaginaInicialComponent implements OnInit, OnDestroy {

  clicked = false;
  lastScroll: number = 0;

  constructor() {
  }

  ngOnInit() {
    window.addEventListener("scroll", this.hideNav)
  }

  ngOnDestroy(){
    window.removeEventListener("scroll", this.hideNav);
  }


  hideNav() {
    let scroll = window.scrollY;
    var bar = document.querySelector("#navegacao");
    let logo = document.querySelector("#logo")
    if(scroll != 0){
        if(scroll > this.lastScroll) {
        bar.classList.remove("scroll-up");
        bar.classList.add("scroll-down");
        } else {
        bar.classList.remove("scroll-down");
        bar.classList.add("scroll-up");
        logo.setAttribute('src', "../../assets/img/connecto branco.svg")
        }
    }else{
        bar.classList.add("scroll-min")
        bar.classList.remove("scroll-down");
        bar.classList.remove("scroll-up");
        logo.setAttribute('src', "../../assets/img/connecto.svg")
    }
    this.lastScroll = scroll;
  }

  clickCollapse(){
    var bar = document.querySelector("#navegacao");
    if(!this.clicked){
      bar.classList.add("nav-button-clicked");
    }else{
      bar.classList.remove("nav-button-clicked");
    }
    this.clicked = !this.clicked;
  }

}
