import { UsuarioLogin } from './../model/UsuarioLogin';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../model/Usuario';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string = environment.server + environment.port + "/usuarios"

  constructor(
    private http: HttpClient
  ) { }

  entrar(userLogin: UsuarioLogin): Observable<UsuarioLogin>{
    return this.http.post<UsuarioLogin>(this.baseUrl + '/logar', userLogin)
  }

  cadastrar(user: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>(this.baseUrl + '/cadastrar', user)

  }

  getByIdUser(id: number): Observable<Usuario>{
    return this.http.get<Usuario>(this.baseUrl + `/${id}` , {
      headers: {'Authorization':environment.token}
    })
  }
}
