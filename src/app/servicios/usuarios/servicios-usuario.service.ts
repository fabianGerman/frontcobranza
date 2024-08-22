import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ModeloUsuario } from 'src/app/modelos/usuarios/modelo-usuario';

@Injectable({
  providedIn: 'root'
})
export class ServiciosUsuarioService {

  urlBase: string;
  endpointlogin: string;
  endpointlogout: string;

  constructor(private _http: HttpClient) {
    //this.urlBase = "http://127.0.0.1:8000/api";
    this.urlBase = "http://10.0.0.251:8100/apicobranzas/api";
    this.endpointlogin = "/login";
    this.endpointlogout = "/logout";
  }

  public login(user: ModeloUsuario):Observable<any>{
    const email = user.email;
    const password = user.password;
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    }
    let userJson = JSON.stringify({email,password});
    console.log(userJson);
    return this._http.post(`${this.urlBase}${this.endpointlogin}`,userJson, httpOption);
  }

  public logout(token: string):Observable<any>{
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization': `Bearer ${token}`
      })
    }
    return this._http.get(`${this.urlBase}${this.endpointlogout}`, httpOption);
  }
}

