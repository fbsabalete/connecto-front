import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faWindows } from '@fortawesome/free-brands-svg-icons';
import { faImages, faStar, faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { faBars, faLayerGroup, faSignOutAlt, faSuitcase, faUserAlt } from '@fortawesome/free-solid-svg-icons';
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
  faSignOutAlt = faSignOutAlt
  faLayerGroup = faLayerGroup

  nome = environment.nomeCompleto
  foto = environment.fotoPerfil
  id = environment.id

  constructor(
    private router: Router
  ) { }

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

  sair() {
    environment.fotoPerfil = ''
    environment.tipoAdmin = ''
    environment.id = 0
    environment.nomeCompleto = ''
    environment.token = ''
    this.router.navigate([''])
  }

}


