import { Component, OnInit } from '@angular/core';
import { faFacebook, faGooglePlus, faLinkedin } from '@fortawesome/free-brands-svg-icons';


@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {
  faFacebook = faFacebook;
  faLinkedin = faLinkedin;
  faGoogle  = faGooglePlus;
  constructor() { }

  ngOnInit(): void {
  }

}
