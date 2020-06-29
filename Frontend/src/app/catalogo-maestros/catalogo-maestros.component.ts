import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';
import { caracteresEspecialesValidator, MyErrorStateMatcher } from '../shared/shared/custom-validators';
import { TipoMaestro } from '../modelos/tipo-maestro';
import { Estatus } from '../modelos/estatus';
import { Router } from '@angular/router';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'}
];

@Component({
  selector: 'app-catalogo-maestros',
  templateUrl: './catalogo-maestros.component.html',
  styleUrls: ['./catalogo-maestros.component.scss']
})
export class CatalogoMaestrosComponent implements OnInit {

  public mostrarFiltroBusqueda = false;

  public matcher = new MyErrorStateMatcher();
  public nombreControl: FormControl;
  public usuarioControl: FormControl;
  public numeroEmpleadoControl: FormControl;
  public tipoControl: FormControl;
  public estatusControl: FormControl;

  public tiposMaestro: TipoMaestro[] = [];
  public listaEstatus: Estatus[] = [];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public dataSource = [];
  public displayedColumns: string[] = ['acciones', 'position', 'name', 'weight', 'symbol'];

  constructor(private router: Router) {
    this.nombreControl = new FormControl('', [caracteresEspecialesValidator]);
    this.usuarioControl = new FormControl('', [caracteresEspecialesValidator]);
    this.numeroEmpleadoControl = new FormControl('', [caracteresEspecialesValidator]);
    this.tipoControl = new FormControl('', []);
    this.estatusControl = new FormControl('', []);
  }

  ngOnInit(): void {
    this.dataSource = ELEMENT_DATA;
  }

  test(e) {
    console.log(e);
  }

  test2(e) {
    console.log(e);
  }

  test3(e) {
    console.log(e);
  }

  irAFormularioMaestros() {
    this.router.navigate(['/inicio/catalogo-maestros/maestro', 'nuevo']);
  }

}
