import { Usuario } from './../model/Usuario';
import { taggedTemplate } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faFacebook, faGooglePlus, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { AuthService } from '../service/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {
  faFacebook = faFacebook;
  faLinkedin = faLinkedin;
  faGoogle  = faGooglePlus;

  nomeValido: boolean = false;
  emailValido: boolean = false;
  senhaValida: boolean = false;
  fotoValida: boolean = true;
  telefoneValido: boolean = false;

  confirmarSenha: String;
  termos: boolean = false;

  user: Usuario = new Usuario()

  constructor(
   private auth: AuthService,
   private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  validaNome(event: any){
    this.nomeValido = this.validation(event.target.value.length < 2, event);
  }

  validaEmail(event: any){
    this.emailValido = this.validation(event.target.value.indexOf('@') == -1 || event.target.value.indexOf('.') == -1, event);
  }

  validaFoto(event: any){
    let regex = /\.(jpe?g|png)$/i
    this.fotoValida = this.validation(!regex.test(event.target.value) && event.target.value.length != 0, event)
  }

  validaTelefone(event: any){
    this.telefoneValido = this.validation(event.target.value.length != 11, event);
  }

  validaSenha(event: any){
    this.senhaValida = this.validation(event.target.value.length < 5 || event.target.value.length > 12, event)
  }

  confirmSenha(event: any){
     this.confirmarSenha = event.target.value;
     this.senhaValida = this.validation(this.confirmarSenha != this.user.senha, event)
  }

  validation(condicao: boolean, event:any){
    let valid = false;
    if(condicao){
      event.target.classList.remove("is-valid");
      event.target.classList.add("is-invalid");
    }else{
      event.target.classList.remove("is-invalid");
      event.target.classList.add("is-valid");
      valid = true;
    }
    return valid;
  }

  validaTermo(event: any) {
    if(event.target.checked){
      this.termos = true;
    } else{
      this.termos = false;
    }
    console.log(this.termos)
   }
  // tipoUser(event: any){
  //   this.tipoUsuario = event.target.value;
  // }

  cadastrar(){
    // this.user.tipo = this.tipoUsuario;

    if(this.nomeValido && this.emailValido && this.senhaValida && this.fotoValida && this.termos){
      this.auth.cadastrar(this.user).subscribe((resp) => {
      this.user = resp;
      this.router.navigate(["/entrar"]);
       Swal.fire({
      icon: 'success',
      title: 'Usuario cadastrado com sucesso',
      showConfirmButton: false,
      timer: 1500
})
      }, erro => {
        Swal.fire({
          icon: 'error',
          title: 'Usuario já cadastrado',
          showConfirmButton: false,
          timer: 1500
    })
      })
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Preencha corretamente as informações',
        showConfirmButton: false,
        timer: 1500
  })
    }
  }


}
