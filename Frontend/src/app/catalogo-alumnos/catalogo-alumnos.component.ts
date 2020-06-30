import { Component, OnInit } from '@angular/core';
import { Pagination } from '../shared/components/generic-grid/generic-grid.component';
import { Usuario } from '../modelos/usuario';
import { AlumnosService } from './service/alumnos.service';
import { Router } from '@angular/router';
import { MyErrorStateMatcher, caracteresEspecialesValidator } from '../shared/shared/custom-validators';
import { FormControl } from '@angular/forms';
import { Estatus } from '../modelos/estatus';
import { Alumno } from '../modelos/alumno';
import { finalize } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { EliminarDialogComponent } from '../shared/shared/components/eliminar-dialog/eliminar-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MENSAJE_INICIAR_SESION } from '../shared/shared/constants/general-constant';

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
  selector: 'app-catalogo-alumnos',
  templateUrl: './catalogo-alumnos.component.html',
  styleUrls: ['./catalogo-alumnos.component.scss']
})
export class CatalogoAlumnosComponent implements OnInit {

  private readonly MENSAJE_ALUMNO_ELIMINADO = 'El Alumno se elimino con éxito';

  public transaccionEnProgreso = false;
  public mostrarFiltroBusqueda = false;

  private paginacion = new Pagination();
  private usuarioFiltro = new Usuario();

  public matcher = new MyErrorStateMatcher();
  public nombreControl: FormControl;
  public usuarioControl: FormControl;
  public matricula: FormControl;
  public estatusControl: FormControl;

  public listaEstatus: Estatus[] = [];

  public dataSource: Usuario[] = [];
  public cantidadRegistros = 0;
  public displayedColumns: string[] = ['accion', 'alumno.idAlumno', 'nombre', 'alumno.matricula'];
  public displayedHeaders: string[] = ['Acciones', 'ID', 'Nombre', 'Matricula'];
  public idRowSelector = 'alumno.idAlumno';

  constructor(private router: Router,
              private alumnoService: AlumnosService,
              private snackBar: MatSnackBar,
              public dialog: MatDialog) {
    this.nombreControl = new FormControl('', [caracteresEspecialesValidator]);
    this.usuarioControl = new FormControl('', [caracteresEspecialesValidator]);
    this.matricula = new FormControl('', []);
    this.estatusControl = new FormControl('', []);

    this.paginacion.pageIndex = 0;
    this.paginacion.pageSize = 5;
    this.paginacion.length = 0;
    this.paginacion.previousPageIndex = 0;
  }

  ngOnInit(): void {
    this.consultarUsuariosConFiltros(null, this.paginacion);
  }

  consultarUsuariosConFiltros(alumno: Alumno, paginacion: Pagination) {
    this.transaccionEnProgreso = true;
    this.dataSource = undefined;
    this.alumnoService.consultarUsuariosConFiltros(new Alumno(), paginacion)
        .pipe(finalize(() => this.transaccionEnProgreso = false))
        .subscribe((alumnoWrapper) => {
          this.dataSource = alumnoWrapper.alumnos;
          this.cantidadRegistros = alumnoWrapper.cantidadRegistros;
        }, (error) => {
          this.snackBar.open(error.status === 401 ? MENSAJE_INICIAR_SESION : error.error, 'Aceptar', {duration: 2000});
        });
  }

  confirmarEliminarAlumno(idAlumno: number): void {
    const dialogRef = this.dialog.open(EliminarDialogComponent, {
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(confirmarEliminar => {
      if (confirmarEliminar) {
        this.eliminarAlumno(idAlumno);
      }
    });
  }

  eliminarAlumno(idAlumno: number) {
    this.alumnoService.eliminarAlumno(idAlumno)
        .subscribe((idAlumnoEliminado) => {
          this.snackBar.open(this.MENSAJE_ALUMNO_ELIMINADO, 'Aceptar', {duration: 2000});
          this.consultarUsuariosConFiltros(null, this.paginacion);
        }, (error) => {
          this.snackBar.open(error.error, 'Aceptar', {duration: 2000});
        });
  }

  editarAlumno(idAlumno: number) {
    this.router.navigate(['/inicio/catalogo-alumnos/alumno', idAlumno]);
  }

  actualizarGrid(paginacion: Pagination) {
    this.consultarUsuariosConFiltros(null, paginacion);
  }

  irAFormularioAlumnos() {
    this.router.navigate(['/inicio/catalogo-alumnos/alumno', 'nuevo']);
  }

}
