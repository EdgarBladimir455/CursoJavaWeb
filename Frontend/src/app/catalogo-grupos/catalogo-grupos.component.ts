import { Component, OnInit } from '@angular/core';
import { GrupoService } from './service/grupo.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Grupo } from '../modelos/grupo';
import { Pagination } from '../shared/components/generic-grid/generic-grid.component';
import { Usuario } from '../modelos/usuario';
import { MyErrorStateMatcher } from '../shared/shared/custom-validators';
import { EliminarDialogComponent } from '../shared/shared/components/eliminar-dialog/eliminar-dialog.component';

@Component({
  selector: 'app-catalogo-grupos',
  templateUrl: './catalogo-grupos.component.html',
  styleUrls: ['./catalogo-grupos.component.scss']
})
export class CatalogoGruposComponent implements OnInit {

  private readonly MENSAJE_GRUPO_ELIMINADO = 'El Grupo se elimino con éxito';

  public transaccionEnProgreso = false;
  public mostrarFiltroBusqueda = false;

  private paginacion = new Pagination();
  private usuarioFiltro = new Usuario();

  public matcher = new MyErrorStateMatcher();

  public dataSource: Grupo[] = [];
  public cantidadRegistros = 0;
  public displayedColumns: string[] = ['accion', 'idGrupo', 'materia.nombre', 'cantidadAlumnos'];
  public displayedHeaders: string[] = ['Acciones', 'ID', 'Materia', 'Cupo Máximo (Alumnos)'];
  public idRowSelector = 'idGrupo';

  constructor(private router: Router,
              private grupoService: GrupoService,
              private snackBar: MatSnackBar,
              public dialog: MatDialog) {

  }

  ngOnInit(): void {
  }

  confirmarEliminar(idGrupo: number): void {
    const dialogRef = this.dialog.open(EliminarDialogComponent, {
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(confirmarEliminar => {
      if (confirmarEliminar) {
        this.eliminar(idGrupo);
      }
    });
  }

  eliminar(idGrupo: number) {
    // this.maestroService.eliminarMaestro(idMaestro)
    //     .subscribe((idMaestroEliminado) => {
    //       this.snackBar.open(this.MENSAJE_MAESTRO_ELIMINADO, 'Aceptar', {duration: 2000});
    //       this.consultarUsuariosConFiltros(null, this.paginacion);
    //     }, (error) => {
    //       this.snackBar.open(error.error, 'Aceptar', {duration: 2000});
    //     });
  }

  editar(idGrupo: number) {
    this.router.navigate(['/inicio/catalogo-grupos/grupo', idGrupo]);
  }

  actualizarGrid(paginacion: Pagination) {
    // this.consultarUsuariosConFiltros(null, paginacion);
  }

  irAFormulario() {
    this.router.navigate(['/inicio/catalogo-grupos/grupo', 'nuevo']);
  }

}
