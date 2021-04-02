import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'connecto';

  constructor(
    public auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(){
    if(environment.token == ''){
      this.router.navigate([""])
    }
  }
}


