import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Portfolio } from '../model/Portfolio';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  baseUrl: string = environment.server + environment.port + "/portfolio"

  constructor(
    private http: HttpClient
  ) { }


  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  getAllPortfolio(): Observable<Portfolio[]>{
    return this.http.get<Portfolio[]>(this.baseUrl, this.token)
  }

  getByIdPortfolio(id: number): Observable<Portfolio>{
    return this.http.get<Portfolio>(this.baseUrl + `/${id}`, this.token)
  }

  postPortfolio(portfolio: Portfolio): Observable<Portfolio>{
    return this.http.post<Portfolio>(this.baseUrl, portfolio, this.token)
  }

  putPortfolio(portfolio: Portfolio): Observable<Portfolio>{
    return this.http.put<Portfolio>(this.baseUrl, portfolio, this.token)
  }

  deletePortfolio(id: number){
    return this.http.delete(this.baseUrl + `/${id}`, this.token)
  }
}
