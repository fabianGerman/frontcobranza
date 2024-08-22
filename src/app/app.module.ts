/**
 * 
 */
import { NgModule } from '@angular/core';

/**
 * 
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/**
 * 
 */
import { HttpClientModule } from '@angular/common/http';

/**
 * 
 */
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

/**
 * ANGULAR MATERIAL
 */
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';

/**
 * 
 */
import { AppRoutingModule } from './app-routing.module';

/**
 * 
 */
import { AppComponent } from './app.component';

/**
 * 
 */
import { ToastrModule } from 'ngx-toastr';

/**
 * COMPONENTES DE LA PAGINA
 */
import { NavComponent } from './layout/nav/nav.component';

/**
 * USUARIO
 */

import { LoginComponent } from './componentes/usuarios/login/login.component';
/**
 * PAGINA PRINCIPAL
 */
import { HomeComponent } from './componentes/home/home/home.component';
/**
 * AFILIADOS
 */
import { AfiliadosComponent } from './cobranza/afiliados/afiliados/afiliados.component';
import { EmpresaComponent } from './cobranza/afiliados/empresa/empresa.component';
import { ObrasocialComponent } from './cobranza/afiliados/obrasocial/obrasocial.component';
import { SugerenciaComponent } from './cobranza/afiliados/sugerencia/sugerencia.component';
import { AfiliadoComponent } from './cobranza/afiliados/afiliado/afiliado.component';
import { ModalafiliadoComponent } from './cobranza/afiliados/modalafiliado/modalafiliado.component';
import { ModalaporteComponent } from './cobranza/afiliados/modalaporte/modalaporte.component';

/**
 * EMPRESAS
 */
import { EmpresasComponent } from './cobranza/empresa/empresas/empresas.component';
import { DeudaComponent } from './cobranza/empresa/deuda/deuda.component';
import { EmpleadoimporteComponent } from './cobranza/empresa/empleadoimporte/empleadoimporte.component';
import { EmpleadodeudaComponent } from './cobranza/empresa/empleadodeuda/empleadodeuda.component';

/**
 * CONVENIOS
 */
import { ConveniosComponent } from './cobranza/convenio/convenios/convenios.component';
import { AsociacionComponent } from './cobranza/convenio/asociacion/asociacion.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavComponent,
    EmpresaComponent,
    ObrasocialComponent,
    SugerenciaComponent,
    DeudaComponent,
    EmpresasComponent,
    AfiliadosComponent,
    ModalafiliadoComponent,
    AfiliadoComponent,
    ModalaporteComponent,
    EmpleadoimporteComponent,
    EmpleadodeudaComponent,
    ConveniosComponent,
    AsociacionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatTabsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatGridListModule,
    ToastrModule.forRoot({
      timeOut:4000,
      positionClass: 'toastr-bottom-right',
      preventDuplicates: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
