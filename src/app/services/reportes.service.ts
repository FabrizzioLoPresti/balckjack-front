import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  constructor(private http:HttpClient) { }

  APIUrl = "http://localhost:8080/reportes/";
  

  getVictoriaNormales(): Observable<number>{
    return this.http.get<number>(this.APIUrl + 'victorias');
  }


  getJugadasPorDia(): Observable<any>{
    const url = this.APIUrl + "juegosPorDia";
        const headers = { 'Content-Type': 'application/json' };
        return this.http.get(url, { headers })
  }

  getVictoriaJugador21(): Observable<number>{
    return this.http.get<number>(this.APIUrl + 'victorias21');
  }


}
