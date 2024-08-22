import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { AfiliadosService } from 'src/app/servicios/afiliado/afiliados.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TransferenciaDatosService } from 'src/app/servicios/otros/transferencia-datos.service';

@Component({
  selector: 'app-obrasocial',
  templateUrl: './obrasocial.component.html',
  styleUrls: ['./obrasocial.component.css']
})
export class ObrasocialComponent implements AfterViewInit{

  totalRegistros = 0;
  paginaActual = 1;
  registrosPorPagina = 5;
  text: string;
  token: string;
  numero: string;
  nombre: string;
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string [] = [
    'IDSJ',
    'NRO',
    'CUIL',
    'NOMBRES',
    'PLANVIGENTE',
    'BAJA',
    'CONTRATADO_DESDE',
    'CONTRATADO_HASTA'
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('table') table:any;

  constructor(private servicio: AfiliadosService,private tds: TransferenciaDatosService,private router: Router){
    this.token = '';
    this.text = '';
    this.numero = '';
    this.nombre = '';
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit():void{
    const token = localStorage.getItem('token');
    if(token !== null){
      this.token = token;
    }else{
      console.log("Error");
    }
  }

  public cargar_datos(): void{
    const texto = this.text;
    if(texto === ''){
      
    }else{
      this.servicio.listar_afiliados_obrasocial(this.token,texto)
      .subscribe((data: any) => {
        if(data.data.length > 0){
          this.dataSource.data = data.data;
          this.numero = data.data[0].OS_NUMERO;
          this.nombre = data.data[0].OS_SIGLAS;
        }else{
          this.dataSource.data = [];
        }
      });
      
    }
    
  }

  onPageChange(event: PageEvent): void{
    this.paginaActual = event.pageIndex + 1;
    this.registrosPorPagina = event.pageSize;

    this.cargar_datos()
  }

  navigateToAfiliado(element: any) {
    this.tds.setData(element);
    this.router.navigate(['/afiliado']);
  }
}
