import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { TransferenciaDatosService } from 'src/app/servicios/otros/transferencia-datos.service';
import { ConvenioService } from 'src/app/servicios/convenio/convenio.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent {
  element: any;
  token: string;
  totalRegistro = 0;
  paginaActual = 1;
  registrosPorPagina = 5;
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string [] = [
    'PERIODO',
    'PRECIO'
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('table') table: any;

  constructor(private tds: TransferenciaDatosService, private servicio: ConvenioService){
    this.token = '';
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }


  ngOnInit():void{
    this.element = this.element = this.tds.getData();
    const token = localStorage.getItem('token');
    if (token !== null) {
      this.token = token;
    } else {
      console.log("Error");
    }
    this.obtener_valores();
  }

  public obtener_valores(){
    this.servicio.obtener_valores(this.token,this.element.ID)
      .subscribe((data: any) =>{
        this.dataSource = data.data;
        console.log(this.element.ID,data,this.dataSource);
      })
  }

  onPageChange(event: PageEvent): void {
    this.paginaActual = event.pageIndex + 1;
    this.registrosPorPagina = event.pageSize;
    this.obtener_valores();
  }
}
