import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObrasocialService {
  
  urlBaseCobranzas: string;
  urlBaseXeilon: string;

  endpoint_cobranzas_listar_obrasocial: string;

  constructor(private _http: HttpClient) {
    this.urlBaseCobranzas = "http://10.0.0.251:8100/apicobranzas/api";
    this.urlBaseXeilon = "http://127.0.0.1:8000/api";

    this.endpoint_cobranzas_listar_obrasocial = "/cobranzas/obrasocial/listar";
   }

   public listar_obrasocial(token: string): Observable<any>{
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    const url = `${this.urlBaseCobranzas}${this.endpoint_cobranzas_listar_obrasocial}`;
    return this._http.get(url, httpOption);
   }
}
