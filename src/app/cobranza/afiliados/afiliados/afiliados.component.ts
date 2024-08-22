import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { AfiliadosService } from 'src/app/servicios/afiliado/afiliados.service';
import { TransferenciaDatosService } from 'src/app/servicios/otros/transferencia-datos.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-afiliados',
  templateUrl: './afiliados.component.html',
  styleUrls: ['./afiliados.component.css'],
})
export class AfiliadosComponent implements AfterViewInit {
  totalRegistros = 0;
  paginaActual = 1;
  registrosPorPagina = 5;
  text: string;
  token: string;
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [
    'IDSJ',
    'NRO',
    'CUIL',
    'NOMBRES',
    'PLANVIGENTE',
    'BAJA',
    'DESCARGAR'
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('table') table: any;

  constructor(private servicio: AfiliadosService, private tds: TransferenciaDatosService, private router: Router) {
    this.text = '';
    this.token = '';
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token !== null) {
      this.token = token;
    } else {
      console.log('Error');
    }
    this.cargar_datos();
  }

  public cargar_datos(): void {
    this.servicio
      .listar_afiliados(this.token, this.paginaActual, this.registrosPorPagina)
      .subscribe((data: any) => {
        this.dataSource.data = data.data;
        this.totalRegistros = Number(data.total);
      });
  }

  onPageChange(event: PageEvent): void {
    this.paginaActual = event.pageIndex + 1;
    this.registrosPorPagina = event.pageSize;
    this.cargar_datos();
  }

  update_table() {
    const texto = this.text;
    if (texto === '') {
      this.cargar_datos();
    } else {
      this.servicio.buscar_afiliado(this.token, texto)
        .subscribe((data: any) => {
          if (data.data.length > 0) {
            this.dataSource.data = data.data;
          } else {
            this.dataSource.data = [];
          }
        });
    }
  }

  navigateToAfiliado(element: any) {
    this.tds.setData(element);
    this.router.navigate(['/afiliado']);
  }

  uploadToAfiliado(element:any){
    this.servicio.exportar_afiliado(this.token, element.CUIL).subscribe(
      (data: Blob) => {
        const a = document.createElement('a');
        const objectUrl = URL.createObjectURL(data);
        a.href = objectUrl;
        a.download = 'afiliados.csv';
        a.click();
        URL.revokeObjectURL(objectUrl);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  uploadToListado(){
    this.servicio.exportar_listado(this.token).subscribe(
      (data: Blob) => {
        const a = document.createElement('a');
        const objectUrl = URL.createObjectURL(data);
        a.href = objectUrl;
        a.download = 'afiliados.csv';
        a.click();
        URL.revokeObjectURL(objectUrl);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

}
