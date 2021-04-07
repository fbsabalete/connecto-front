import { AuthService } from './../service/auth.service';
import { Usuario } from './../model/Usuario';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Postagem } from '../model/Postagem';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  idUser: number
  user: Usuario = new Usuario()
  listaCategoria: string[]

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(){
    this.idUser = this.route.snapshot.params['id']
    this.findByIdUser(this.idUser)

  }

  listarServicos(){
    this.user.postagem.forEach((resp) =>{
      this.listaCategoria = []
      if(resp.prestadorServicos){
        this.listaCategoria.push(resp.tema.categoria)
      }
    })
  }


  findByIdUser(id: number){
    this.authService.getByIdUser(id).subscribe((resp: Usuario) =>{
      this.user = resp
      this.listaCategoria = []
      resp.postagem.forEach((item) =>{
        if(item.prestadorServicos && !this.listaCategoria.includes(item.tema.categoria)){
          this.listaCategoria.push(item.tema.categoria)
        }
      })
    })
  }
}
