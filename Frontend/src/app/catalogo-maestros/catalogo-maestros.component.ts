import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';
import { caracteresEspecialesValidator, MyErrorStateMatcher } from '../shared/shared/custom-validators';
import { TipoMaestro } from '../modelos/tipo-maestro';
import { Estatus } from '../modelos/estatus';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MaestroService } from './service/maestro.service';
import { Maestro } from '../modelos/maestro';
import { Usuario } from '../modelos/usuario';
import { Pagination } from '../shared/components/generic-grid/generic-grid.component';
import { EliminarDialogComponent } from '../shared/shared/components/eliminar-dialog/eliminar-dialog.component';
import { finalize } from 'rxjs/operators';
import { MENSAJE_INICIAR_SESION } from '../shared/shared/constants/general-constant';


@Component({
  selector: 'app-catalogo-maestros',
  templateUrl: './catalogo-maestros.component.html',
  styleUrls: ['./catalogo-maestros.component.scss']
})
export class CatalogoMaestrosComponent implements OnInit {

  private readonly MENSAJE_MAESTRO_ELIMINADO = 'El Maestro se elimino con éxito';

  public transaccionEnProgreso = false;
  public mostrarFiltroBusqueda = false;

  private paginacion = new Pagination();
  private usuarioFiltro = new Usuario();

  public matcher = new MyErrorStateMatcher();
  public nombreControl: FormControl;
  public usuarioControl: FormControl;
  public numeroEmpleadoControl: FormControl;
  public tipoControl: FormControl;
  public estatusControl: FormControl;

  public tiposMaestro: TipoMaestro[] = [];
  public listaEstatus: Estatus[] = [];

  public dataSource: Usuario[] = [];
  public cantidadRegistros = 0;
  public displayedColumns: string[] = ['accion', 'maestro.idMaestro', 'nombre', 'maestro.numeroEmpleado', 'maestro.tipoMaestro.nombre'];
  public displayedHeaders: string[] = ['Acciones', 'ID', 'Nombre', 'Número Empleado', 'Tipo Maestro'];
  public idRowSelector = 'maestro.idMaestro';

  constructor(private router: Router,
              private maestroService: MaestroService,
              private snackBar: MatSnackBar,
              public dialog: MatDialog) {
    this.nombreControl = new FormControl('', [caracteresEspecialesValidator]);
    this.usuarioControl = new FormControl('', [caracteresEspecialesValidator]);
    this.numeroEmpleadoControl = new FormControl('', [caracteresEspecialesValidator]);
    this.tipoControl = new FormControl('', []);
    this.estatusControl = new FormControl('', []);

    this.paginacion.pageIndex = 0;
    this.paginacion.pageSize = 5;
    this.paginacion.length = 0;
    this.paginacion.previousPageIndex = 0;
  }

  ngOnInit(): void {
    this.consultarUsuariosConFiltros(null, this.paginacion);
  }

  consultarUsuariosConFiltros(alumno: Maestro, paginacion: Pagination) {
    this.transaccionEnProgreso = true;
    this.dataSource = undefined;
    this.maestroService.consultarUsuariosConFiltros(new Maestro(), paginacion)
        .pipe(finalize(() => this.transaccionEnProgreso = false))
        .subscribe((maestroWrapper) => {
          this.dataSource = maestroWrapper.maestros;
          this.cantidadRegistros = maestroWrapper.cantidadRegistros;
        }, (error) => {
          this.snackBar.open(error.status === 401 ? MENSAJE_INICIAR_SESION : error.error, 'Aceptar', {duration: 2000});
        });
  }

  confirmarEliminarMaestro(idAlumno: number): void {
    const dialogRef = this.dialog.open(EliminarDialogComponent, {
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(confirmarEliminar => {
      if (confirmarEliminar) {
        this.eliminarMaestro(idAlumno);
      }
    });
  }

  eliminarMaestro(idMaestro: number) {
    this.maestroService.eliminarMaestro(idMaestro)
        .subscribe((idMaestroEliminado) => {
          this.snackBar.open(this.MENSAJE_MAESTRO_ELIMINADO, 'Aceptar', {duration: 2000});
          this.consultarUsuariosConFiltros(null, this.paginacion);
        }, (error) => {
          this.snackBar.open(error.error, 'Aceptar', {duration: 2000});
        });
  }

  editarMaestro(idMaestro: number) {
    this.router.navigate(['/inicio/catalogo-maestros/maestro', idMaestro]);
  }

  actualizarGrid(paginacion: Pagination) {
    this.consultarUsuariosConFiltros(null, paginacion);
  }

  irAFormularioMaestros() {
    this.router.navigate(['/inicio/catalogo-maestros/maestro', 'nuevo']);
  }

}
