import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MateriaService } from '../service/materia.service';
import { EstatusService } from 'src/app/estatus/service/estatus.service';

@Component({
  selector: 'app-formulario-materias',
  templateUrl: './formulario-materias.component.html',
  styleUrls: ['./formulario-materias.component.scss']
})
export class FormularioMateriasComponent implements OnInit {

  private idMateria = null;
  private MENSAJE_MATERIA_AGREGADO = 'Materia agregada con éxito';
  private MENSAJE_MATERIA_EDITADO = 'Materia editada con éxito';

  public ocultarContrasena = true;
  public transaccionEnProgreso = false;
  public esEdicion = false;

    constructor(private activatedRoute: ActivatedRoute,
                private fb: FormBuilder,
                private router: Router,
                private snackBar: MatSnackBar,
                private materiaService: MateriaService,
                private estatusService: EstatusService) {
    this.activatedRoute.params
    .subscribe((param) => {
      if (param['id'] && !isNaN(param['id'])) {
        this.idMateria = parseInt(param['id'], 10);
        this.esEdicion = true;
        // this.consultarMaestro();
      } else {
        this.idMateria = null;
        this.esEdicion = false;
      }
    });
  }

  ngOnInit(): void {
  }

  regresar() {
    this.router.navigate(['/inicio/catalogo-materias']);
  }

}
