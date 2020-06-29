import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import {ErrorStateMatcher} from '@angular/material/core';
import { caracteresEspecialesValidator } from 'src/app/shared/shared/custom-validators';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();
  public formularioLogin: FormGroup;
  public ocultarContrasena = true;
  public loginIncorrecto = false;

  constructor(private fb: FormBuilder,
              private authService: AuthenticationService,
              private router: Router) {

    if (this.authService.isUserLoggedIn()) {
      this.router.navigateByUrl('inicio/perfil');
    }

    this.formularioLogin = this.fb.group({
        usuario: new FormControl('', [Validators.required, caracteresEspecialesValidator]),
        contrasena: new FormControl('', [Validators.required, caracteresEspecialesValidator])
    });
  }

  ngOnInit(): void {
  }

  login() {
      if (this.formularioLogin.valid) {
        const usuario = this.formularioLogin.controls['usuario'].value;
        const contrasena = this.formularioLogin.controls['contrasena'].value;

        this.authService.authenticate(usuario, contrasena)
            .subscribe(() => {
                    this.router.navigateByUrl('inicio');
                }, (error) => {
                  console.log('contraseña o usuario incorrecto');
                  this.loginIncorrecto = true;
                }
            );
      }
  }

}
