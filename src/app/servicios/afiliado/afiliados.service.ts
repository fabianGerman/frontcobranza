import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AfiliadosService {

  urlBaseCobranzas: string;
  urlBaseXeilon: string;
  endpoint_cobranzas_listar_afiliados: string;
  endpoint_cobranzas_buscar_afiliado: string;
  endpoint_cobranzas_buscar_empresa: string;
  endpoint_cobranzas_buscar_obrasocial: string;
  endpoint_cobranzas_sugerencias: string;
  endpoint_cobranzas_datos_afiliado: string;
  endpoint_cobranzas_aportes_afiliado: string;
  endpoint_cobranzas_validos_afiliado: string;
  endpoint_cobranzas_descargar_afiliado: string;
  endpoint_cobranzas_descargar_listado: string;
  endpoint_cobranzas_descargar_detalles: string;
  endpoint_cobranzas_descargar_sugerencias : string;

  endpoint_xeilon_listar_afiliados: string;

  constructor(private _http: HttpClient) {
    this.urlBaseCobranzas = "http://10.0.0.251:8100/apicobranzas/api";
    this.urlBaseXeilon = "http://127.0.0.1:8000/api";

    this.endpoint_xeilon_listar_afiliados = "/xeilon/afiliados/listar";

    this.endpoint_cobranzas_listar_afiliados = "/cobranzas/afiliados/listar";
    this.endpoint_cobranzas_datos_afiliado = "/cobranzas/afiliados/datos";
    this.endpoint_cobranzas_buscar_afiliado = "/cobranzas/afiliados/buscar";

    this.endpoint_cobranzas_buscar_empresa = "/cobranzas/afiliados/empresas";
    this.endpoint_cobranzas_buscar_obrasocial = "/cobranzas/afiliados/obrasocial";
    this.endpoint_cobranzas_sugerencias = "/cobranzas/afiliados/sugerencia";
    
    this.endpoint_cobranzas_aportes_afiliado = "/cobranzas/afiliados/aportes/";
    this.endpoint_cobranzas_validos_afiliado = "/cobranzas/afiliados/validos/";

    
    this.endpoint_cobranzas_descargar_detalles = "/cobranzas/afiliados/exportardetalles";
    this.endpoint_cobranzas_descargar_afiliado = "/cobranzas/afiliados/exportarafiliado";
    this.endpoint_cobranzas_descargar_listado = "/cobranzas/afiliados/exportarlista";
    this.endpoint_cobranzas_descargar_sugerencias = "/cobranzas/afiliados/exportarsugerencias";
  }

  public listar_afiliados(token: string, page: number, perpage: number): Observable<any> {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    const url = `${this.urlBaseCobranzas}${this.endpoint_cobranzas_listar_afiliados}`;
    return this._http.get(url, httpOption);
  }

  public listar_afiliados_empresas(token: string, parametro: string) {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    const url = `${this.urlBaseCobranzas}${this.endpoint_cobranzas_buscar_empresa}`;
    let parametros = JSON.stringify({parametro});
    return this._http.post(url, parametros, httpOption);
  }

  public listar_afiliados_obrasocial(token: string, parametro: string){
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    const url = `${this.urlBaseCobranzas}${this.endpoint_cobranzas_buscar_obrasocial}`;
    let parametros = JSON.stringify({parametro});
    return this._http.post(url, parametros, httpOption);
  }

  public listar_sugerencia_planes(token: string, estado:number, obrasocial:string[], planvigente:number, activo:number, aporte:number, periodo:string, cuil:string):Observable<any>{
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    const url = `${this.urlBaseCobranzas}${this.endpoint_cobranzas_sugerencias}`;
    let parametros = JSON.stringify({estado,obrasocial,planvigente,activo,aporte,periodo,cuil});
    return this._http.post(url,parametros,httpOption);
  }

  public buscar_afiliado(token: string, parametro: string) {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    let parametros = JSON.stringify({parametro});
    const url = `${this.urlBaseCobranzas}${this.endpoint_cobranzas_buscar_afiliado}`;
    return this._http.post(url, parametros, httpOption);
  }

  public datos_afiliado(token: string, cuil: string) {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    let parametro = JSON.stringify({cuil});
    const url = `${this.urlBaseCobranzas}${this.endpoint_cobranzas_datos_afiliado}`;
    //console.log(url,parametro);
    return this._http.post(url, parametro, httpOption);
  }

  public aportes_afiliado(token: string, afiliado: string){
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    const url = `${this.urlBaseCobranzas}${this.endpoint_cobranzas_aportes_afiliado}${afiliado}`;
    return this._http.get(url, httpOption);
  }

  public ultimos_aportes_afiliados(token: string, afiliado: number, periodo: string){
    const [mes, año] = periodo.split('/');
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    //console.log(token);
    const url = `${this.urlBaseCobranzas}${this.endpoint_cobranzas_validos_afiliado}${afiliado}/${mes}/${año}`;
    
    //console.log(url);
    return this._http.get(url, httpOption);
  }

  public exportar_afiliado(token: string, cuil: string):Observable<Blob>{
    const httpOption = {
      headers: new HttpHeaders({
        'Accept':'text/cvs',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }),
      responseType: 'blob' as 'json'
    };    
    let parametros = JSON.stringify({cuil});
    const url = `${this.urlBaseCobranzas}${this.endpoint_cobranzas_descargar_afiliado}`;
    return this._http.post<Blob>(url, parametros, httpOption);
  }

  public exportar_detalles(token: string, cuil: string):Observable<Blob>{
    const httpOption = {
      headers: new HttpHeaders({
        'Accept':'text/cvs',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }),
      responseType: 'blob' as 'json'
    };    
    let parametros = JSON.stringify({cuil});
    const url = `${this.urlBaseCobranzas}${this.endpoint_cobranzas_descargar_detalles}`;
    return this._http.post<Blob>(url, parametros, httpOption);
  }

  public exportar_listado(token: string):Observable<Blob>{
    const httpOption = {
      headers: new HttpHeaders({
        'Accept':'text/cvs',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }),
      responseType: 'blob' as 'json'
    };  
    const url = `${this.urlBaseCobranzas}${this.endpoint_cobranzas_descargar_listado}`;
    return this._http.get<Blob>(url,httpOption);
  }

  public exportar_sugerencias(token: string, estado:number, obrasocial:string[], planvigente:number, activo:number, aporte:number, periodo:string, cuil:string):Observable<Blob>{
    const httpOption = {
      headers: new HttpHeaders({
        'Accept':'text/cvs',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }),
      responseType: 'blob' as 'json'
    };  
    //const url = `${this.urlBaseCobranzas}${this.endpoint_cobranzas_sugerencias}?estado=${estado}&cuil=${cuil}&planvigente=${planvigente}&aporte=${aporte}&activo=${activo}&obraSocial=${obrasocial.join(',')}&periodo=${periodo}`;
    const url = `${this.urlBaseCobranzas}${this.endpoint_cobranzas_descargar_sugerencias}`;
    let parametros = JSON.stringify({estado,obrasocial,planvigente,activo,aporte,periodo,cuil});
    //console.log(parametros,url,estado,obrasocial,planvigente,activo,aporte);
    return this._http.post<Blob>(url,parametros,httpOption);
  }
}
