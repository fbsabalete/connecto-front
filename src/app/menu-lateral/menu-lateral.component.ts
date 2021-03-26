import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
export class MenuLateralComponent implements OnInit {

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
