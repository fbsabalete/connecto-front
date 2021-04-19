import { Observable } from 'rxjs';
import { CurtidaPostagem } from './../model/CurtidaPostagem';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CurtirService {

  constructor(
    private http: HttpClient
  ) { }

  token = {
    headers: new HttpHeaders().set(`Authorization`, environment.token)
  }

  postCurtidas(curtida: CurtidaPostagem): Observable<CurtidaPostagem>{
    return this.http.post<CurtidaPostagem>(`${environment.server}/curtir`,curtida, this.token)
  }

  deleteCurtida(id: number){
    return this.http.delete(`${environment.server}/curtir/${id}`,this.token)
  }


}
