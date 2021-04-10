import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagina-inicial',
  templateUrl: './pagina-inicial.component.html',
  styleUrls: ['./pagina-inicial.component.css']
})
export class PaginaInicialComponent implements OnInit, OnDestroy {

  clicked = false;
  lastScroll: number = 0;
  contador: number = 0
  i: number = 0
  listaNomes: string[] = ["Pintura", "Marcenaria", "Limpeza", "Construção"]

  constructor() {
  }

  ngOnInit() {
    window.scroll(0,0)

    window.addEventListener("scroll", this.hideNav)
    this.animations();

  }

  ngOnDestroy(){
    window.removeEventListener("scroll", this.hideNav);
  }

  animations(){
    var item = <HTMLElement>document.querySelector("#letreiro")

    window.onblur = () => {
      item.classList.remove("typing")
      this.contador=0

      item.innerHTML = this.listaNomes[0]
      this.i=0
    }
    window.onfocus = () => {
      item.classList.add("typing")
      this.i++
      if(this.i>=this.listaNomes.length)this.i=0
    }

    item.onanimationiteration = () => {
      if(this.contador == 1){
        item.innerHTML = this.listaNomes[this.i]
        this.i++;
        this.contador=0
      }else{
        this.contador++;
      }

      if(this.i>=this.listaNomes.length)this.i=0

    }


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

