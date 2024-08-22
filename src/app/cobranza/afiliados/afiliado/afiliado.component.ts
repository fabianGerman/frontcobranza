import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { TransferenciaDatosService } from 'src/app/servicios/otros/transferencia-datos.service';
import { AfiliadosService } from 'src/app/servicios/afiliado/afiliados.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { ModalaporteComponent } from '../modalaporte/modalaporte.component';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-afiliado',
  templateUrl: './afiliado.component.html',
  styleUrls: ['./afiliado.component.css']
})


export class AfiliadoComponent implements AfterViewInit{

  element: any;
  token: string;
  afiliado: any;
  aportes: any;
  totalRegistro = 0;
  paginaActual = 1;
  registrosPorPagina = 5;
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string [] = [
    'ap_periodoaporte',
    'ap_sumaaporte',
    'ap_sumacontribucion',
    'ap_sumaremuneracion',
    'ap_contribucionaporte',
    'CUIT',
    'RAZON_SOCIAL'
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('table') table: any;

  constructor(public dialog: MatDialog, private tds: TransferenciaDatosService, private af_servicio: AfiliadosService){
    this.token = '';
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit():void{
    this.element = this.tds.getData();
    const token = localStorage.getItem('token');
    if (token !== null) {
      this.token = token;
    } else {
      console.log("Error");
    }
    this.obtener_datos();
  }

  public obtener_datos(){
    this.af_servicio.datos_afiliado(this.token,this.element.CUIL)
    .subscribe((data : any)=>{
      this.afiliado = data;
      this.dataSource = data.aportes;
    });
  }

  public obtener_aportes(){
    this.af_servicio.aportes_afiliado(this.token,this.element.id)
    .subscribe((data:any)=>{
      this.dataSource.data = data;
    });
  }

  public openDialog(selectedElement: any){
    const dialogRef = this.dialog.open(ModalaporteComponent,{
      data: selectedElement
    });

    dialogRef.afterClosed().subscribe((result: any)=>{
      console.log(`Dialog result: ${result}`)
    });
  }

  uploadToDetalle(element:any){
    this.af_servicio.exportar_detalles(this.token, element.CUIL).subscribe(
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
