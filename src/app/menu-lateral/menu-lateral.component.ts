import { Component, OnInit } from '@angular/core';
import { faWindows } from '@fortawesome/free-brands-svg-icons';
import { faImages, faStar, faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { faBars, faSuitcase, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment.prod';


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
  faBars  = faBars
  faTimesCircle = faTimesCircle
  icon = faBars

  nome = environment.nomeCompleto
  foto = environment.fotoPerfil

  constructor() { }

  ngOnInit() {
  }
  menuAtivo: boolean = false;

  mostrarNav(){
    if(this.icon == faTimesCircle){
      this.icon = faBars
    }else{
      this.icon = faTimesCircle
    }
    let menu = document.querySelector("#side-menu");
    if(!this.menuAtivo){
      menu.classList.add("ativo");
    }else{
      menu.classList.remove("ativo");
    }
    this.menuAtivo = !this.menuAtivo;
  }

}


