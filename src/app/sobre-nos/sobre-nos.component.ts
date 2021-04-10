import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sobre-nos',
  templateUrl: './sobre-nos.component.html',
  styleUrls: ['./sobre-nos.component.css']
})
export class SobreNosComponent implements OnInit {

  clicked = false;

  constructor() { }

  ngOnInit() {
    window.scroll(0,0)
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
