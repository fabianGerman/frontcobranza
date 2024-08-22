import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/usuarios/login/login.component';
import { HomeComponent } from './componentes/home/home/home.component';
import { AuthGuard } from './util/auth.guard';
import { AfiliadosComponent } from './cobranza/afiliados/afiliados/afiliados.component';
import { EmpresaComponent } from './cobranza/afiliados/empresa/empresa.component';
import { ObrasocialComponent } from './cobranza/afiliados/obrasocial/obrasocial.component';
import { SugerenciaComponent } from './cobranza/afiliados/sugerencia/sugerencia.component';
import { EmpresasComponent } from './cobranza/empresa/empresas/empresas.component';
import { DeudaComponent } from './cobranza/empresa/deuda/deuda.component';
import { AfiliadoComponent } from './cobranza/afiliados/afiliado/afiliado.component';
import { EmpleadoimporteComponent } from './cobranza/empresa/empleadoimporte/empleadoimporte.component';
import { EmpleadodeudaComponent } from './cobranza/empresa/empleadodeuda/empleadodeuda.component';
import { ConveniosComponent } from './cobranza/convenio/convenios/convenios.component';
import { AsociacionComponent } from './cobranza/convenio/asociacion/asociacion.component';

const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'home',component:HomeComponent,canActivate:[AuthGuard]},
  {path:'afiliados',component:AfiliadosComponent,canActivate:[AuthGuard]},
  {path:'empresa',component:EmpresaComponent,canActivate:[AuthGuard]},
  {path:'obrasocial',component:ObrasocialComponent,canActivate:[AuthGuard]},
  {path:'sugerencia',component:SugerenciaComponent,canActivate:[AuthGuard]},
  {path:'empresas',component:EmpresasComponent,canActivate:[AuthGuard]},
  {path:'deuda',component:DeudaComponent,canActivate:[AuthGuard]},
  {path:'afiliado',component:AfiliadoComponent,canActivate:[AuthGuard]},
  {path:'empleadoimporte',component:EmpleadoimporteComponent,canActivate:[AuthGuard]},
  {path:'empleadodeuda',component:EmpleadodeudaComponent,canActivate:[AuthGuard]},
  {path:'convenios',component:ConveniosComponent,canActivate:[AuthGuard]},
  {path:'asociacion',component:AsociacionComponent,canActivate:[AuthGuard]},
  {path:'**',redirectTo:'home',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
