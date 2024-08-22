import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  urlBaseCobranzas: string;

  endpoint_cobranzas_listar_empresas: string;
  endpoint_cobranzas_listar_deudas: string;
  endpoint_cobranzas_buscar_empresa: string;
  endpoint_cobranzas_buscar_deuda: string;
  endpoint_cobranzas_obtener_importes:string;
  endpoint_cobranzas_obtener_deudas:string;
  endpoint_cobranzas_descargar_empresas: string;
  endpoint_cobranzas_descargar_deudas: string;
  endopint_cobranzas_descargar_empleado_importe: string;

  constructor(private _http:HttpClient) {
    this.urlBaseCobranzas = "http://10.0.0.251:8100/apicobranzas/api";
    
    this.endpoint_cobranzas_listar_empresas = "/cobranzas/empresas/listar";
    this.endpoint_cobranzas_listar_deudas = "/cobranzas/empresas/deudas";
    this.endpoint_cobranzas_buscar_empresa = "/cobranzas/empresas/buscarempresa";
    this.endpoint_cobranzas_buscar_deuda = "/cobranzas/empresas/buscardeuda";
    this.endpoint_cobranzas_descargar_empresas = "/cobranzas/empresas/exportarempresas";
    this.endpoint_cobranzas_descargar_deudas = "/cobranzas/empresas/exportardeudas";
    this.endpoint_cobranzas_obtener_importes = "/cobranzas/empresas/obtenerimportes";
    this.endpoint_cobranzas_obtener_deudas = "/cobranzas/empresas/obtenerdeudas";
    this.endopint_cobranzas_descargar_empleado_importe = "/cobranzas/empresas/exportarempleadosimporte";
  }

  public listar_empresas(token: string,  page: number, perpage: number): Observable<any>{
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    const url = `${this.urlBaseCobranzas}${this.endpoint_cobranzas_listar_empresas}`;
    return this._http.get(url,httpOption);
  }

  public listar_deudas(token: string,  page: number, perpage: number): Observable<any>{
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    const url = `${this.urlBaseCobranzas}${this.endpoint_cobranzas_listar_deudas}`;
    return this._http.get(url,httpOption);
  }

  public buscar_empresa(token: string, empresa:string, periodo:string){
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    let parametros = JSON.stringify({empresa,periodo});
    const url = `${this.urlBaseCobranzas}${this.endpoint_cobranzas_buscar_empresa}`;
    return this._http.post(url,parametros,httpOption);
  }

  public buscar_deuda(token: string, empresa:string, periodo:string){
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    let parametros = JSON.stringify({empresa,periodo});
    const url = `${this.urlBaseCobranzas}${this.endpoint_cobranzas_buscar_deuda}`;
    return this._http.post(url,parametros,httpOption);
  }

  public obtener_empleados_importe(token: string, empresa:string, periodo:string){
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    let parametros = JSON.stringify({empresa,periodo});
    const url = `${this.urlBaseCobranzas}${this.endpoint_cobranzas_obtener_importes}`;
    console.log(parametros);
    return this._http.post(url,parametros,httpOption);
  }

  public obtener_empleados_deuda(token: string, empresa:string, periodo:string){
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    let parametros = JSON.stringify({empresa,periodo});
    const url = `${this.urlBaseCobranzas}${this.endpoint_cobranzas_obtener_deudas}`;
    return this._http.post(url,parametros,httpOption);
  }

  public exportar_empresas(token: string, empresa:any, periodo: any):Observable<Blob>{
    const httpOption = {
      headers: new HttpHeaders({
        'Accept':'text/cvs',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }),
      responseType: 'blob' as 'json'
    };  
    //const url = `${this.urlBaseCobranzas}${this.endpoint_cobranzas_sugerencias}?estado=${estado}&cuil=${cuil}&planvigente=${planvigente}&aporte=${aporte}&activo=${activo}&obraSocial=${obrasocial.join(',')}&periodo=${periodo}`;
    const url = `${this.urlBaseCobranzas}${this.endpoint_cobranzas_descargar_empresas}`;
    let parametros = JSON.stringify({empresa,periodo});
    return this._http.post<Blob>(url,parametros,httpOption);
  }

  public exportar_deudas(token: string, empresa:any, periodo: any):Observable<Blob>{
    const httpOption = {
      headers: new HttpHeaders({
        'Accept':'text/cvs',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }),
      responseType: 'blob' as 'json'
    };  
    //const url = `${this.urlBaseCobranzas}${this.endpoint_cobranzas_sugerencias}?estado=${estado}&cuil=${cuil}&planvigente=${planvigente}&aporte=${aporte}&activo=${activo}&obraSocial=${obrasocial.join(',')}&periodo=${periodo}`;
    const url = `${this.urlBaseCobranzas}${this.endpoint_cobranzas_descargar_deudas}`;
    let parametros = JSON.stringify({empresa,periodo});
    return this._http.post<Blob>(url,parametros,httpOption);
  }

  public exportar_empleados_importe(token: string, empresa:any, periodo: any):Observable<Blob>{
    const httpOption = {
      headers: new HttpHeaders({
        'Accept':'text/cvs',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }),
      responseType: 'blob' as 'json'
    };  
    //const url = `${this.urlBaseCobranzas}${this.endpoint_cobranzas_sugerencias}?estado=${estado}&cuil=${cuil}&planvigente=${planvigente}&aporte=${aporte}&activo=${activo}&obraSocial=${obrasocial.join(',')}&periodo=${periodo}`;
    const url = `${this.urlBaseCobranzas}${this.endopint_cobranzas_descargar_empleado_importe}`;
    let parametros = JSON.stringify({empresa,periodo});
    return this._http.post<Blob>(url,parametros,httpOption);
  }
}
