import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CatalogoAlumnosComponent } from './catalogo-alumnos.component';
import { AuthGaurdService } from '../security/service/auth-gaurd.service';
import { TIPO_PEFIL_ADMINISTRADOR } from '../shared/shared/constants/general-constant';
import { GenericGridModule } from '../shared/components/generic-grid/generic-grid.module';
import { SharedModule } from '../shared/shared/shared.module';
import { AlumnosService } from './service/alumnos.service';
import { FormularioAlumnosComponent } from './formulario-alumnos/formulario-alumnos.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { EstatusService } from '../estatus/service/estatus.service';

const routes: Routes = [
  {path: '', component: CatalogoAlumnosComponent,
   canActivate: [AuthGaurdService], data: {perfilAcceso: TIPO_PEFIL_ADMINISTRADOR}},
   {path: 'alumno/:id', component: FormularioAlumnosComponent,
   canActivate: [AuthGaurdService], data: {perfilAcceso: TIPO_PEFIL_ADMINISTRADOR}}
];

@NgModule({
  declarations: [
    CatalogoAlumnosComponent,
    FormularioAlumnosComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    GenericGridModule,

    MatProgressSpinnerModule,
    MatDialogModule,
    RouterModule.forChild(routes)
  ],
  providers: [AlumnosService, EstatusService]
})
export class CatalogoAlumnosModule { }
