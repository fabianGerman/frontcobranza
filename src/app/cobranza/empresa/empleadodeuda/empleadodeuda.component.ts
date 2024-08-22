import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { TransferenciaDatosService } from 'src/app/servicios/otros/transferencia-datos.service';
import { EmpresaService } from 'src/app/servicios/empresa/empresa.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-empleadodeuda',
  templateUrl: './empleadodeuda.component.html',
  styleUrls: ['./empleadodeuda.component.css']
})
export class EmpleadodeudaComponent {
  element: any;
  token: string;
  afiliado: any;
  aportes: any;
  totalRegistro = 0;
  paginaActual = 1;
  registrosPorPagina = 5;
  totalRegistros = 0;
  months: string[] = [];
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [
    'IDSJ',
    'NRO',
    'CUIL',
    'NOMBRE',
    ...this.months
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('table') table: any;


  constructor(private tds: TransferenciaDatosService, private emp_servicio: EmpresaService){
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
    this.generateMonthColumns();
    this.obtener_deuda();
  }

  public obtener_deuda(){
    this.emp_servicio.obtener_empleados_deuda(this.token,this.element[0].emp_cuit,this.element[1])
    .subscribe((data: any) => {
      // Transform data to include month columns
        this.dataSource.data = data.map((item: any) => {
        const newItem = { ...item };
        item.deudas.forEach((deuda: any, index: number) => {
          newItem[this.months[index]] = parseFloat(deuda.deuda_total).toFixed(2);
        });
        
        return newItem;
      });
      
      this.totalRegistros = data.length;
    });
  }

  calculateMonthlyData(item: any, month: string): number {
    // Implement your logic to calculate the data for each month
    return Math.floor(Math.random() * 100); // Example: random number
  }

  generateMonthColumns() {
    const today = new Date();
    const monthsBack = 12;

    for (let i = 0; i < monthsBack; i++) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const formattedMonth = `${('0' + (date.getMonth() + 1)).slice(-2)}/${date.getFullYear()}`;
      this.months.push(formattedMonth);
      this.displayedColumns.push(formattedMonth);
    }
  }

  onPageChange(event: PageEvent): void {
    this.paginaActual = event.pageIndex + 1;
    this.registrosPorPagina = event.pageSize;
    this.obtener_deuda();
  }
}
