import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-saiba-mais',
  templateUrl: './saiba-mais.component.html',
  styleUrls: ['./saiba-mais.component.css']
})
export class SaibaMaisComponent implements OnInit {

  constructor() {
    window.addEventListener('scroll', this.naTela)
  }

  ngOnInit() {
  }

  naTela() {
    let elementos = document.querySelectorAll(".animacao")
    let windowHeight = window.innerHeight;
    elementos.forEach(function (element) {
      let elementPosition = element.getBoundingClientRect();
      let elementTop = elementPosition.top;
      if (elementTop < windowHeight) {
        element.classList.add("na-tela");
      } else {
        element.classList.remove("na-tela");
      }
    });
  }

}
