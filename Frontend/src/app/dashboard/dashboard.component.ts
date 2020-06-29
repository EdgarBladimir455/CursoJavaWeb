import { Component, OnInit, HostListener } from '@angular/core';
import { AuthenticationService } from 'src/app/security/service/authentication.service';
import { HttpClientService } from 'src/app/security/service/httpclient.service';
import { FormControl } from '@angular/forms';
import { Usuario } from '../modelos/usuario';
import { TIPO_PEFIL_ADMINISTRADOR, TIPO_PEFIL_MAESTRO, TIPO_PEFIL_ALUMNO, MENU_ADMINISTRADOR, MENU_MAESTROS, MENU_ALUMNOS, MENSAJE_INICIAR_SESION } from '../shared/shared/constants/general-constant';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  mode = new FormControl('over');
  public usuarioEnSession: Usuario = null;
  public opcionesMenu: {nombre: string, path: string}[] = [];

  constructor(private authService: AuthenticationService,
              private snackBar: MatSnackBar,
              private service: HttpClientService) {
  }

  ngOnInit(): void {
    this.consultarUsuarioEnSession();
  }

  consultarUsuarioEnSession() {
    this.service.consultarUsuarioEnSession()
        .subscribe((usuario: Usuario) => {
          console.log(usuario);
          this.usuarioEnSession = usuario;
          sessionStorage.setItem('perfil', this.usuarioEnSession.tipoPerfil.clave);
          this.generarMenu();
        }, (error) => {
          this.snackBar.open(error.status === 401 ? MENSAJE_INICIAR_SESION : error.error, 'Aceptar', {duration: 2000});
        });
  }

  generarMenu() {
    switch (this.usuarioEnSession.tipoPerfil.clave) {
      case TIPO_PEFIL_ADMINISTRADOR:
        this.usuarioEnSession.nombre += ' (Administrador)';
        this.opcionesMenu = MENU_ADMINISTRADOR;
        break;
      case TIPO_PEFIL_MAESTRO:
        this.usuarioEnSession.nombre += ' (Maestro)';
        this.opcionesMenu = MENU_MAESTROS;
        break;
      case TIPO_PEFIL_ALUMNO:
        this.usuarioEnSession.nombre += ' (Alumno)';
        this.opcionesMenu = MENU_ALUMNOS;
        break;
    }
  }

  logout() {
    this.authService.logOut();
  }

}
