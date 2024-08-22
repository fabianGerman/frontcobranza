import { Component, Inject, AfterViewInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AfiliadosService } from 'src/app/servicios/afiliado/afiliados.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-modalafiliado',
  templateUrl: './modalafiliado.component.html',
  styleUrls: ['./modalafiliado.component.css']
})
export class ModalafiliadoComponent {
  token: string;
  totalRegistros = 0;
  paginaActual = 1;
  registrosPorPagina = 5;

  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['ap_periodoaporte','ap_sumaremuneracion','ap_sumacontribucion','ap_sumaaporte','ap_contribucionaporte'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('table') table: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private af_servicio: AfiliadosService) { 
  
    this.token = '';
    this.aportes_validos();
  }

  ngAfterViewInit():void{
    this.dataSource.paginator = this.paginator;
  }

  ngOInit():void{
    const token = localStorage.getItem('token');
    if(token !== null){
      this.token = token;
    }else{
      console.log("Error");
    }
    this.aportes_validos();
  }

  public aportes_validos(){
    
    this.af_servicio.ultimos_aportes_afiliados(this.data.token,this.data.selectedElement.id,this.data.selectedElement.ap_periodoaporte)
    .subscribe((response:any)=>{
      if(response.length > 0){
        this.dataSource.data = response;
        console.log(this.dataSource);
      }else{
        this.dataSource.data = [];
      }
    })
    
  }
}
