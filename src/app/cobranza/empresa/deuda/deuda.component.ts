import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { EmpresaService } from 'src/app/servicios/empresa/empresa.service';
import { TransferenciaDatosService } from 'src/app/servicios/otros/transferencia-datos.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deuda',
  templateUrl: './deuda.component.html',
  styleUrls: ['./deuda.component.css']
})
export class DeudaComponent {
  element: any;
  cuil: string;
  periodo: string;
  months: string[] = [];
  token: string;
  dataSource = new MatTableDataSource<any>();
  totalRegistros = 0;
  paginaActual = 1;
  registrosPorPagina = 5;
  displayedColumns: string[] = [
    'emp_id',
    'emp_cuit',
    'emp_razonsocial',
    'total',
    'titulares',
    'activos',
    'inactivos',
    'inconsistencias',
    ...this.months
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('table') table: any;

  constructor(private servicio: EmpresaService, private tds: TransferenciaDatosService, private router: Router) {
    this.token = '';
    this.cuil = '';
    this.periodo = '';
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
    this.generateMonthColumns();
    this.listar_deudas();
  }

  listar_deudas() {
    this.servicio.listar_deudas(this.token, this.paginaActual, this.registrosPorPagina)
      .subscribe((data: any) => {
        // Transform data to include month columns
        this.dataSource.data = data.map((item: any) => {
          const newItem = { ...item };
          item.deudas.forEach((deuda: any, index: number) => {
            newItem[this.months[index]] = parseFloat(deuda.de_total).toFixed(2);
          });
          return newItem;
        });
        this.totalRegistros = data.length;
      });
  }

  // Placeholder function to calculate monthly data, adjust according to actual data structure
  calculateMonthlyData(item: any, month: string): number {
    // Implement your logic to calculate the data for each month
    return Math.floor(Math.random() * 100); // Example: random number
  }

  onPageChange(event: PageEvent): void {
    this.paginaActual = event.pageIndex + 1;
    this.registrosPorPagina = event.pageSize;
    this.listar_deudas();
  }

  navigateToAfiliado(element: any) {
    this.tds.setData([element,this.periodo]);
    this.router.navigate(['/empleadodeuda']);
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

  update_table(){
    const cuil_ingresado = this.cuil;
    const periodo_ingresado = this.periodo;
    if(cuil_ingresado === '' || periodo_ingresado === ''){
      this.listar_deudas();
    }else{
      this.servicio.buscar_deuda(this.token,cuil_ingresado,periodo_ingresado)
      .subscribe((data: any) => {
        // Transform data to include month columns
        this.dataSource.data = data.map((item: any) => {
          const newItem = { ...item };
          item.deudas.forEach((deuda: any, index: number) => {
            newItem[this.months[index]] = parseFloat(deuda.de_total).toFixed(2);
          });
          return newItem;
        });
        this.totalRegistros = data.length;
      });
    }
    
  }

  uploadToListado(element:any){
    var empresaSeleccionada:any = null;
    var periodoSeleccionado:any = null;
  
    if(this.cuil !== '' && this.periodo !== ''){
      empresaSeleccionada = this.cuil;
      periodoSeleccionado = this.periodo;
    
    }
    console.log(empresaSeleccionada, periodoSeleccionado);
    this.servicio.exportar_deudas(this.token,empresaSeleccionada,periodoSeleccionado)
    .subscribe((data: Blob) => {
      const a = document.createElement('a');
      const objectUrl = URL.createObjectURL(data);
      a.href = objectUrl;
      a.download = 'empresas.csv';
      a.click();
      URL.revokeObjectURL(objectUrl);
    },
    (error) => {
      console.error('Error:',error);
    }
  );
  }
}
