import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MyErrorStateMatcher, caracteresEspecialesValidator } from 'src/app/shared/shared/custom-validators';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Estatus } from 'src/app/modelos/estatus';
import { Usuario } from 'src/app/modelos/usuario';
import { Alumno } from 'src/app/modelos/alumno';
import { AlumnosService } from '../service/alumnos.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { MENSAJE_INICIAR_SESION } from 'src/app/shared/shared/constants/general-constant';

@Component({
  selector: 'app-formulario-alumnos',
  templateUrl: './formulario-alumnos.component.html',
  styleUrls: ['./formulario-alumnos.component.scss']
})
export class FormularioAlumnosComponent implements OnInit {

  private idAlumno = null;
  private idUsuario = null;
  private MENSAJE_ALUMNO_AGREGADO = 'Alumno agregado con éxito';
  private MENSAJE_ALUMNO_EDITADO = 'Alumno editado con éxito';

  public ocultarContrasena = true;
  public transaccionEnProgreso = false;
  public esEdicion = false;

  public matcher = new MyErrorStateMatcher();
  public formularioAlumnos: FormGroup;

  public listaEstatus: Estatus[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              private router: Router,
              private snackBar: MatSnackBar,
              private alumnoService: AlumnosService) {
    this.activatedRoute.params
    .subscribe((param) => {
      if (param['id'] && !isNaN(param['id'])) {
        this.idAlumno = parseInt(param['id'], 10);
        this.esEdicion = true;
        console.log('usuario editar: ' + this.idAlumno);
        this.consultarAlumno();
      } else {
        this.idAlumno = null;
        this.esEdicion = false;
        console.log('nuevo usuario');
      }
    });

    this.formularioAlumnos = this.fb.group({
      nombreControl: new FormControl('', [Validators.required, caracteresEspecialesValidator]),
      usuarioControl: new FormControl('', [Validators.required, caracteresEspecialesValidator]),
      contrasenaControl: new FormControl('', [Validators.required, caracteresEspecialesValidator]),
      matriculaControl: new FormControl('', [Validators.required]),
      estatusControl: new FormControl('', [])
    });
  }

  ngOnInit(): void {
  }

  regresar() {
    this.router.navigate(['/inicio/catalogo-alumnos']);
  }

  consultarAlumno() {
    this.transaccionEnProgreso = true;
    this.alumnoService.consultarAlumno(this.idAlumno)
    .pipe(finalize(() => this.transaccionEnProgreso = false))
    .subscribe((usuario) => {
      this.cargarAlumno(usuario);
    }, (error: HttpErrorResponse) => {
      this.snackBar.open(error.status === 401 ? MENSAJE_INICIAR_SESION : error.error, 'Aceptar', {duration: 2000});
    });
  }

  cargarAlumno(usuario: Usuario) {
    this.idUsuario = usuario.idUsuario;
    this.formularioAlumnos.controls['contrasenaControl'].setValidators([caracteresEspecialesValidator]);
    this.formularioAlumnos.controls['nombreControl'].setValue(usuario.nombre);
    this.formularioAlumnos.controls['usuarioControl'].setValue(usuario.usuario);
    this.formularioAlumnos.controls['matriculaControl'].setValue(usuario.alumno.matricula);
    this.formularioAlumnos.controls['contrasenaControl'].setValue(null);
    this.formularioAlumnos.controls['estatusControl'].setValue(usuario.estatus.clave);
  }

  procesarFormularioAlumnos() {
    if (this.formularioAlumnos.valid && !this.transaccionEnProgreso) {
      this.transaccionEnProgreso = true;
      const alumno = this.generarAlumno();
      console.log(alumno);

      if (this.esEdicion) {
        this.alumnoService.editarAlumno(alumno)
            .pipe(finalize(() => this.transaccionEnProgreso = false))
            .subscribe((idAlumno) => {
              console.log(idAlumno);
              this.snackBar.open(this.MENSAJE_ALUMNO_EDITADO, 'Aceptar', {duration: 2000});
              this.router.navigate(['/inicio/catalogo-alumnos']);
            }, (error: HttpErrorResponse) => {
              this.snackBar.open(error.status === 401 ? MENSAJE_INICIAR_SESION : error.error, 'Aceptar', {duration: 2000});
            });
      } else {
        this.alumnoService.agregarAlumno(alumno)
            .pipe(finalize(() => this.transaccionEnProgreso = false))
            .subscribe((idAlumno) => {
              console.log(idAlumno);
              this.snackBar.open(this.MENSAJE_ALUMNO_AGREGADO, 'Aceptar', {duration: 2000});
              this.router.navigate(['/inicio/catalogo-alumnos']);
            }, (error: HttpErrorResponse) => {
              this.snackBar.open(error.status === 401 ? MENSAJE_INICIAR_SESION : error.error, 'Aceptar', {duration: 2000});
            });
      }
    }
  }

  generarAlumno() {
    console.log('generando alumno');
    const alumno = new Alumno();
    alumno.idAlumno = this.idAlumno;
    alumno.idUsuario = this.idUsuario;
    alumno.nombre = this.formularioAlumnos.controls['nombreControl'].value;
    alumno.usuario = this.formularioAlumnos.controls['usuarioControl'].value;
    alumno.contrasena = this.formularioAlumnos.controls['contrasenaControl'].value;
    alumno.matricula = this.formularioAlumnos.controls['matriculaControl'].value;
    alumno.estatus = new Estatus();
    alumno.estatus.clave = this.formularioAlumnos.controls['estatusControl'].value;

    return alumno;
  }

}
