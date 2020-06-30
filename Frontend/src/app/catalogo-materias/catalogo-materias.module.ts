import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CatalogoMateriasComponent } from './catalogo-materias.component';
import { SharedModule } from '../shared/shared/shared.module';
import { GenericGridModule } from '../shared/components/generic-grid/generic-grid.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthGaurdService } from '../security/service/auth-gaurd.service';
import { FormularioMateriasComponent } from './formulario-materias/formulario-materias.component';
import { TIPO_PEFIL_MAESTRO } from '../shared/shared/constants/general-constant';
import { MateriaService } from './service/materia.service';
import { EstatusService } from '../estatus/service/estatus.service';

const routes: Routes = [
  {path: '', component: CatalogoMateriasComponent,
   canActivate: [AuthGaurdService], data: {perfilAcceso: TIPO_PEFIL_MAESTRO}},
  {path: 'materia/:id', component: FormularioMateriasComponent,
   canActivate: [AuthGaurdService], data: {perfilAcceso: TIPO_PEFIL_MAESTRO}}
];

@NgModule({
  declarations: [
    CatalogoMateriasComponent,
    FormularioMateriasComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    GenericGridModule,

    MatProgressSpinnerModule,
    MatDialogModule,
    RouterModule.forChild(routes)
  ],
  providers: [MateriaService, EstatusService]
})
export class CatalogoMateriasModule { }
