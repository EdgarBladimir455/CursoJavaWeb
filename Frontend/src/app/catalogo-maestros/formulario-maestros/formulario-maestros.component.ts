import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MyErrorStateMatcher, caracteresEspecialesValidator } from 'src/app/shared/shared/custom-validators';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaestroService } from '../service/maestro.service';
import { TipoMaestro } from 'src/app/modelos/tipo-maestro';
import { Estatus } from 'src/app/modelos/estatus';
import { finalize } from 'rxjs/operators';
import { Usuario } from 'src/app/modelos/usuario';
import { HttpErrorResponse } from '@angular/common/http';
import { MENSAJE_INICIAR_SESION } from 'src/app/shared/shared/constants/general-constant';
import { Maestro } from 'src/app/modelos/maestro';
import { TipoMaestroService } from 'src/app/tipo-maestro/service/tipo-maestro.service';
import { EstatusService } from 'src/app/estatus/service/estatus.service';


@Component({
  selector: 'app-formulario-maestros',
  templateUrl: './formulario-maestros.component.html',
  styleUrls: ['./formulario-maestros.component.scss']
})
export class FormularioMaestrosComponent implements OnInit {

  private idMaestro = null;
  private idUsuario = null;
  private MENSAJE_MAESTRO_AGREGADO = 'Maestro agregado con éxito';
  private MENSAJE_MAESTRO_EDITADO = 'Maestro editado con éxito';

  public ocultarContrasena = true;
  public transaccionEnProgreso = false;
  public esEdicion = false;

  public matcher = new MyErrorStateMatcher();
  public formularioMaestros: FormGroup;

  public listaEstatus: Estatus[] = [];
  public listaTiposMaestro: TipoMaestro[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              private router: Router,
              private snackBar: MatSnackBar,
              private maestroService: MaestroService,
              private tipoMaestroService: TipoMaestroService,
              private estatusService: EstatusService) {
    this.activatedRoute.params
    .subscribe((param) => {
      if (param['id'] && !isNaN(param['id'])) {
        this.idMaestro = parseInt(param['id'], 10);
        this.esEdicion = true;
        this.consultarMaestro();
      } else {
        this.idMaestro = null;
        this.esEdicion = false;
      }
    });

    this.formularioMaestros = this.fb.group({
      nombreControl: new FormControl('', [Validators.required, caracteresEspecialesValidator]),
      usuarioControl: new FormControl('', [Validators.required, caracteresEspecialesValidator]),
      contrasenaControl: new FormControl('', [Validators.required, caracteresEspecialesValidator]),
      numeroEmpleadoControl: new FormControl('', [Validators.required]),
      tipoMaestroControl: new FormControl('', [Validators.required]),
      estatusControl: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit(): void {
    this.consultarTiposMaestro();
    this.consultarEstatus();
  }

  consultarTiposMaestro() {
    this.tipoMaestroService.consultar()
    .pipe(finalize(() => this.transaccionEnProgreso = false))
    .subscribe((tiposMaestro) => {
      this.listaTiposMaestro = tiposMaestro;

      if (this.listaTiposMaestro.length > 0) {
        this.formularioMaestros.controls['tipoMaestroControl'].setValue(this.listaTiposMaestro[0].idtipoMaestro);
      }
    }, (error: HttpErrorResponse) => {
      this.snackBar.open(error.status === 401 ? MENSAJE_INICIAR_SESION : error.error, 'Aceptar', {duration: 2000});
    });
  }

  consultarEstatus() {
    this.estatusService.consultar()
    .pipe(finalize(() => this.transaccionEnProgreso = false))
    .subscribe((listaEstatus) => {
      this.listaEstatus = listaEstatus;

      if (this.listaEstatus.length > 0) {
        this.formularioMaestros.controls['estatusControl'].setValue(this.listaEstatus[0].idEstatus);
      }
    }, (error: HttpErrorResponse) => {
      this.snackBar.open(error.status === 401 ? MENSAJE_INICIAR_SESION : error.error, 'Aceptar', {duration: 2000});
    });
  }

  regresar() {
    this.router.navigate(['/inicio/catalogo-maestros']);
  }

  consultarMaestro() {
    this.transaccionEnProgreso = true;
    this.maestroService.consultarMaestro(this.idMaestro)
    .pipe(finalize(() => this.transaccionEnProgreso = false))
    .subscribe((maestro) => {
      this.cargarMaestro(maestro);
    }, (error: HttpErrorResponse) => {
      this.snackBar.open(error.status === 401 ? MENSAJE_INICIAR_SESION : error.error, 'Aceptar', {duration: 2000});
    });
  }

  cargarMaestro(usuario: Usuario) {
    this.idUsuario = usuario.idUsuario;
    this.formularioMaestros.controls['contrasenaControl'].setValidators([caracteresEspecialesValidator]);
    this.formularioMaestros.controls['nombreControl'].setValue(usuario.nombre);
    this.formularioMaestros.controls['usuarioControl'].setValue(usuario.usuario);
    this.formularioMaestros.controls['numeroEmpleadoControl'].setValue(usuario.maestro.numeroEmpleado);
    this.formularioMaestros.controls['contrasenaControl'].setValue(null);
    this.formularioMaestros.controls['tipoMaestroControl'].setValue(usuario.maestro.tipoMaestro.idtipoMaestro);
    this.formularioMaestros.controls['estatusControl'].setValue(usuario.estatus.idEstatus);
  }

  procesarFormularioMaestros() {
    if (this.formularioMaestros.valid && !this.transaccionEnProgreso) {
      this.transaccionEnProgreso = true;
      const maestro = this.generarMaestro();

      if (this.esEdicion) {
        this.maestroService.editarMaestro(maestro)
            .pipe(finalize(() => this.transaccionEnProgreso = false))
            .subscribe((idMaestro) => {
              this.snackBar.open(this.MENSAJE_MAESTRO_EDITADO, 'Aceptar', {duration: 2000});
              this.router.navigate(['/inicio/catalogo-maestros']);
            }, (error: HttpErrorResponse) => {
              this.snackBar.open(error.status === 401 ? MENSAJE_INICIAR_SESION : error.error, 'Aceptar', {duration: 2000});
            });
      } else {
        this.maestroService.agregarMaestro(maestro)
            .pipe(finalize(() => this.transaccionEnProgreso = false))
            .subscribe((idMaestro) => {
              this.snackBar.open(this.MENSAJE_MAESTRO_AGREGADO, 'Aceptar', {duration: 2000});
              this.router.navigate(['/inicio/catalogo-maestros']);
            }, (error: HttpErrorResponse) => {
              this.snackBar.open(error.status === 401 ? MENSAJE_INICIAR_SESION : error.error, 'Aceptar', {duration: 2000});
            });
      }
    }
  }

  generarMaestro() {
    console.log('generando maestro');
    const maestro = new Maestro();
    maestro.idMaestro = this.idMaestro;
    maestro.idUsuario = this.idUsuario;
    maestro.nombre = this.formularioMaestros.controls['nombreControl'].value;
    maestro.usuario = this.formularioMaestros.controls['usuarioControl'].value;
    maestro.contrasena = this.formularioMaestros.controls['contrasenaControl'].value;
    maestro.numeroEmpleado = this.formularioMaestros.controls['numeroEmpleadoControl'].value;
    maestro.tipoMaestro = new TipoMaestro();
    maestro.tipoMaestro.idtipoMaestro = this.formularioMaestros.controls['tipoMaestroControl'].value;
    maestro.estatus = new Estatus();
    maestro.estatus.idEstatus = this.formularioMaestros.controls['estatusControl'].value;

    return maestro;
  }

}
