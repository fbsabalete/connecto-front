import { Component, OnInit } from '@angular/core';
import { faImages, faStar } from '@fortawesome/free-regular-svg-icons';
import { faSuitcase, faUserAlt } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
export class MenuLateralComponent implements OnInit {

  faStar = faStar
  faSuitCase = faSuitcase
  faUserAlt =faUserAlt
  faImages = faImages

  constructor() { }

  ngOnInit() {

  }
  menuAtivo: boolean = false;

  mostrarNav(){
    let menu = document.querySelector("#side-menu");
    if(!this.menuAtivo){
      menu.classList.add("ativo");
    }else{
      menu.classList.remove("ativo");
    }
    this.menuAtivo = !this.menuAtivo;
  }

}
