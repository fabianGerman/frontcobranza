import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConvenioService {

  urlBaseCobranzas: string;
  endpoint_cobranzas_listar_convenios: string;

  constructor(private _http: HttpClient) {
    this.urlBaseCobranzas = "http://10.0.0.251:8100/apicobranzas/api";
    this.endpoint_cobranzas_listar_convenios = "/cobranzas/convenios/listar"; 
  }

  public listar_convenios(token:string): Observable<any>{
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    const url = `${this.urlBaseCobranzas}${this.endpoint_cobranzas_listar_convenios}`;
    return this._http.get(url,httpOption);
  }
}
