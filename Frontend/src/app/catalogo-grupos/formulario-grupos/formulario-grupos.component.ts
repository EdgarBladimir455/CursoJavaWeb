import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GrupoService } from '../service/grupo.service';
import { EstatusService } from 'src/app/estatus/service/estatus.service';

@Component({
  selector: 'app-formulario-grupos',
  templateUrl: './formulario-grupos.component.html',
  styleUrls: ['./formulario-grupos.component.scss']
})
export class FormularioGruposComponent implements OnInit {

  private idGrupo = null;
  private MENSAJE_GRUPO_AGREGADO = 'Grupo agregado con éxito';
  private MENSAJE_GRUPO_EDITADO = 'Grupo editado con éxito';

  public ocultarContrasena = true;
  public transaccionEnProgreso = false;
  public esEdicion = false;

    constructor(private activatedRoute: ActivatedRoute,
                private fb: FormBuilder,
                private router: Router,
                private snackBar: MatSnackBar,
                private grupoService: GrupoService,
                private estatusService: EstatusService) {
    this.activatedRoute.params
    .subscribe((param) => {
      if (param['id'] && !isNaN(param['id'])) {
        this.idGrupo = parseInt(param['id'], 10);
        this.esEdicion = true;
        // this.consultarMaestro();
      } else {
        this.idGrupo = null;
        this.esEdicion = false;
      }
    });
  }

  ngOnInit(): void {
  }

  regresar() {
    this.router.navigate(['/inicio/catalogo-grupos']);
  }

}
