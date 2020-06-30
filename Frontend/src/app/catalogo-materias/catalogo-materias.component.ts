import { Component, OnInit } from '@angular/core';
import { MyErrorStateMatcher } from '../shared/shared/custom-validators';
import { Pagination } from '../shared/components/generic-grid/generic-grid.component';
import { Usuario } from '../modelos/usuario';
import { Materia } from '../modelos/materia';
import { MateriaService } from './service/materia.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { EliminarDialogComponent } from '../shared/shared/components/eliminar-dialog/eliminar-dialog.component';

@Component({
  selector: 'app-catalogo-materias',
  templateUrl: './catalogo-materias.component.html',
  styleUrls: ['./catalogo-materias.component.scss']
})
export class CatalogoMateriasComponent implements OnInit {

  private readonly MENSAJE_MATERI_ELIMINADO = 'La Materia se elimino con éxito';

  public transaccionEnProgreso = false;
  public mostrarFiltroBusqueda = false;

  private paginacion = new Pagination();
  private usuarioFiltro = new Usuario();

  public matcher = new MyErrorStateMatcher();

  public dataSource: Materia[] = [];
  public cantidadRegistros = 0;
  public displayedColumns: string[] = ['accion', 'idMateria', 'nombre', 'clave'];
  public displayedHeaders: string[] = ['Acciones', 'ID', 'Nombre', 'Clave'];
  public idRowSelector = 'idMateria';

  constructor(private router: Router,
              private materiaService: MateriaService,
              private snackBar: MatSnackBar,
              public dialog: MatDialog) {

  }

  ngOnInit(): void {
  }

  confirmarEliminar(idMateria: number): void {
    const dialogRef = this.dialog.open(EliminarDialogComponent, {
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(confirmarEliminar => {
      if (confirmarEliminar) {
        this.eliminar(idMateria);
      }
    });
  }

  eliminar(idMateria: number) {
    // this.maestroService.eliminarMaestro(idMaestro)
    //     .subscribe((idMaestroEliminado) => {
    //       this.snackBar.open(this.MENSAJE_MAESTRO_ELIMINADO, 'Aceptar', {duration: 2000});
    //       this.consultarUsuariosConFiltros(null, this.paginacion);
    //     }, (error) => {
    //       this.snackBar.open(error.error, 'Aceptar', {duration: 2000});
    //     });
  }

  editar(idMateria: number) {
    this.router.navigate(['/inicio/catalogo-materias/materia', idMateria]);
  }

  actualizarGrid(paginacion: Pagination) {
    // this.consultarUsuariosConFiltros(null, paginacion);
  }

  irAFormulario() {
    this.router.navigate(['/inicio/catalogo-materias/materia', 'nuevo']);
  }

}
