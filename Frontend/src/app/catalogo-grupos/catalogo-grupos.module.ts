import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogoGruposComponent } from './catalogo-grupos.component';
import { FormularioGruposComponent } from './formulario-grupos/formulario-grupos.component';
import { SharedModule } from '../shared/shared/shared.module';
import { GenericGridModule } from '../shared/components/generic-grid/generic-grid.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule, Routes } from '@angular/router';
import { AuthGaurdService } from '../security/service/auth-gaurd.service';
import { TIPO_PEFIL_MAESTRO } from '../shared/shared/constants/general-constant';
import { GrupoService } from './service/grupo.service';
import { EstatusService } from '../estatus/service/estatus.service';

const routes: Routes = [
  {path: '', component: CatalogoGruposComponent,
   canActivate: [AuthGaurdService], data: {perfilAcceso: TIPO_PEFIL_MAESTRO}},
  {path: 'grupo/:id', component: FormularioGruposComponent,
   canActivate: [AuthGaurdService], data: {perfilAcceso: TIPO_PEFIL_MAESTRO}}
];

@NgModule({
  declarations: [
    CatalogoGruposComponent,
    FormularioGruposComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    GenericGridModule,

    MatProgressSpinnerModule,
    MatDialogModule,
    RouterModule.forChild(routes)
  ],
  providers: [GrupoService, EstatusService]
})
export class CatalogoGruposModule { }
