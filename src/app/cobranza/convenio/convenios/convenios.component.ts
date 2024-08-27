import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ConvenioService } from 'src/app/servicios/convenio/convenio.service';
import { TransferenciaDatosService } from 'src/app/servicios/otros/transferencia-datos.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-convenios',
  templateUrl: './convenios.component.html',
  styleUrls: ['./convenios.component.css']
})
export class ConveniosComponent implements AfterViewInit {
  token: string;
  element: any;
  dataSource = new MatTableDataSource<any>();
  totalRegistros = 0;
  paginaActual = 1;
  registrosPorPagina = 5;
  displayedColumns: string[] = [
    'ID',
    'RESOLUCION',
    'DESCRIPCION',
    'INHABILITADO'
  ];
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('table') table: any;

  constructor(private servicio: ConvenioService,private tds: TransferenciaDatosService, private router: Router){
    this.token = '';
  }

  ngAfterViewInit():void{
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit():void{
    const token = localStorage.getItem('token');
    if(token !== null){
      this.token = token;
    }else{
      console.log("Error");
    }
    this.listar_convenios();
  }

  public listar_convenios():void{
    this.servicio
    .listar_convenios(this.token)
    .subscribe((data: any) => {
      this.dataSource.data = data.data;
      this.totalRegistros = Number(data.total);
      console.log(this.dataSource, data, data.total,this.totalRegistros);
    });
  }

  onPageChange(event: PageEvent): void {
    this.paginaActual = event.pageIndex + 1;
    this.registrosPorPagina = event.pageSize;
    this.listar_convenios();
  }

}
