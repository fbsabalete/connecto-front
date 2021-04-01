import { Component, OnInit } from '@angular/core';
import { faFacebook, faGooglePlus, faLinkedin } from '@fortawesome/free-brands-svg-icons';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  faFacebook = faFacebook;
  faLinkedin = faLinkedin;
  faGoogle  = faGooglePlus;

  constructor() { }

  ngOnInit(): void {
  }

}
