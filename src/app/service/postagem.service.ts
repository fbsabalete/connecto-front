import { Postagem } from './../model/Postagem';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PostagemService {

  private listaSource = new BehaviorSubject([])
  listaAtualizada = this.listaSource.asObservable();

  baseUrl: string = environment.server + environment.port + "/postagem"

  constructor(
    private http: HttpClient
    ) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  getAllPostagem(): Observable<Postagem[]>{

    return this.http.get<Postagem[]>(this.baseUrl, this.token)


  }

  getByIdPostagem(id: number): Observable<Postagem>{
    return this.http.get<Postagem>(this.baseUrl + `/${id}`, this.token)
  }

  postPostagem(postagem: Postagem): Observable<Postagem>{
    return this.http.post<Postagem>(this.baseUrl, postagem, this.token)
  }

  putPostagem(postagem: Postagem): Observable<Postagem>{
    return this.http.put<Postagem>(this.baseUrl, postagem, this.token)
  }

  deletePostagem(id: number){
    return this.http.delete(this.baseUrl + `/${id}`, this.token)
  }

  atualizarLista(listaPostagem: Postagem[]){
    this.listaSource.next(listaPostagem)
  }


}
