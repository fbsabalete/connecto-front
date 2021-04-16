import { Observable } from 'rxjs';
import { ComentarioPostagem } from './../model/ComentarioPostagem';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  constructor(
    private http: HttpClient
  ) { }

  token = {
    headers: new HttpHeaders().set(`Authorization` , environment.token)
  }

  getAllComentarios(): Observable<ComentarioPostagem[]>{
    return this.http.get<ComentarioPostagem[]>(`${environment.server}/comentiaros`, this.token)
  }

  getComentarioById(id: number): Observable<ComentarioPostagem>{
    return this.http.get<ComentarioPostagem>(`${environment.server}/comentarios/${id}`)
  }

  postComentario(comentario: ComentarioPostagem): Observable<ComentarioPostagem>{
    return this.http.post<ComentarioPostagem>(`${environment.server}/comentarios`, comentario, this.token)
  }

  putComentario(comentario: ComentarioPostagem): Observable<ComentarioPostagem>{
    return this.http.put<ComentarioPostagem>(`${environment.server}/comentarios/`, comentario, this.token)
  }

  deleteComentario(id: number){
    return this.http.delete(`${environment.server}/comentarios/${id}`, this.token)
  }

}
