import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { AfiliadosService } from 'src/app/servicios/afiliado/afiliados.service';
import { ObrasocialService } from 'src/app/servicios/obrasocial/obrasocial.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { ModalafiliadoComponent } from '../modalafiliado/modalafiliado.component';
import { Router } from '@angular/router';
import { TransferenciaDatosService } from 'src/app/servicios/otros/transferencia-datos.service';

interface Estado{
  value: number;
  viewValue: string;
}

interface PlanVigente{
  value: number;
  viewValue: string;
}

interface Activo{
  value: number;
  viewValue: string;
}

interface Aporte{
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-sugerencia',
  templateUrl: './sugerencia.component.html',
  styleUrls: ['./sugerencia.component.css']
})

export class SugerenciaComponent implements AfterViewInit{
  element: any;

  toppings = new FormControl();
  toppingList: any[] = [];
  toppingList2:any[] = [];

  selectedEstado!: any;
  selectedPlan!: any;
  selectedActivo!: any;
  selectedAporte!:any;

  periodo: string;
  cuil: string;

  estados: Estado[] = [
    {value: -1, viewValue:"TODOS"},
    {value: 0, viewValue:"NO SUPERADOR"},
    {value: 1, viewValue:"SUPERADOR"}
  ];

  planesvigentes: PlanVigente[] = [
    {value: -1, viewValue:"TODOS"},
    {value: 0, viewValue:"NO"},
    {value: 1, viewValue:"SI"}
  ];

  activos: Activo[] = [
    {value: -1, viewValue:"TODOS"},
    {value: 0, viewValue:"INACTIVO"},
    {value: 1, viewValue:"ACTIVO"}
  ]

  aportes: Aporte[] = [
    {value: -1, viewValue:"TODOS"},
    {value: 0, viewValue:"NO"},
    {value: 1, viewValue:"SI"}
  ]

  totalRegistros = 0;
  paginaActual = 1;
  registrosPorPagina = 5;
  token: string;
  
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [
    'IDSJ',
    'NRO',
    'NOMBRES',
    'activo',
    'PLANVIGENTE',
    'FAMILIAR',
    'OS_SIGLAS',
    'PLAN_NOMBRE',
    'PLAN_ACTUAL',
    'PLAN_CALCULADO',
    'REMUNERACION',
    'TOTAL'
  ]
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('table') table:any;

  constructor(public dialog: MatDialog, private af_servicio: AfiliadosService, private os_servicio: ObrasocialService,private tds: TransferenciaDatosService, private router: Router){
    this.token = '';
    this.periodo = '';
    this.cuil = '';
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  
  ngOnInit():void{
    this.element = this.tds.getData();
    const token = localStorage.getItem('token');
    if(token !== null){
      this.token = token;
    }else{
      console.log("Error");
    }
    this.fetchToppingList();
    this.toppings.valueChanges.subscribe(selected =>{
      console.log(selected);
    });
  }
  
  public fetchToppingList():void{
    this.os_servicio.listar_obrasocial(this.token)
    .subscribe((data: any[]) => {
      this.toppingList = data;
    }),
    (error: any) => {
      console.error('error fetching topping list: ',error);
    }
  }

  buscarSugerencias(){
    const estadoSeleccionado = this.selectedEstado;
    const obraSocialSeleccionada = this.toppings.value;
    const planVigenteSeleccionado = this.selectedPlan;
    const activoSeleccionado = this.selectedActivo;
    const aporteSeleccionado = this.selectedAporte;
    const periodo = this.periodo;
    const cuil = this.cuil;
    this.af_servicio.listar_sugerencia_planes(this.token, estadoSeleccionado, obraSocialSeleccionada, planVigenteSeleccionado, activoSeleccionado, aporteSeleccionado, periodo, cuil)
    .subscribe((data: any) => {
      console.log(data);
      if(data.data.length > 0){
        this.dataSource.data = data.data;
      }else{
        this.dataSource.data=[];
      }
    })
    
  }

  onPageChange(event: PageEvent): void{
    this.paginaActual = event.pageIndex + 1;
    this.registrosPorPagina = event.pageSize;

    this.buscarSugerencias();
  }

  openDialog(selectedElement: any) {
    const dialogRef = this.dialog.open(ModalafiliadoComponent,{
      data: { selectedElement, token: this.token }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  navigateToAfiliado(element: any){
    this.tds.setData(element);
    this.router.navigate(['/afiliado']);
  }

  uploadToDetalle(element:any){
    const estadoSeleccionado = this.selectedEstado;
    const obraSocialSeleccionada = this.toppings.value;
    const planVigenteSeleccionado = this.selectedPlan;
    const activoSeleccionado = this.selectedActivo;
    const aporteSeleccionado = this.selectedAporte;
    const periodo = this.periodo;
    const cuil = this.cuil;
    this.af_servicio.exportar_sugerencias(this.token, estadoSeleccionado, obraSocialSeleccionada, planVigenteSeleccionado, activoSeleccionado, aporteSeleccionado, periodo, cuil ).subscribe(
      (data: Blob) => {
        const a = document.createElement('a');
        const objectUrl = URL.createObjectURL(data);
        a.href = objectUrl;
        a.download = 'sugerencias.csv';
        a.click();
        URL.revokeObjectURL(objectUrl);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}
