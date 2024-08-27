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

  constructor(private tds: TransferenciaDatosService){
    this.token = '';
  }

  ngOnInit():void{
    this.element = this.element = this.tds.getData();
    console.log(this.element);
  }
}
