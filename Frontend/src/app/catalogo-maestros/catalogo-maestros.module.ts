import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogoMaestrosComponent } from './catalogo-maestros.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { CdkTableModule } from '@angular/cdk/table';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from '../shared/shared/shared.module';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { Routes, RouterModule } from '@angular/router';
import { AuthGaurdService } from '../security/service/auth-gaurd.service';
import { TIPO_PEFIL_ADMINISTRADOR } from '../shared/shared/constants/general-constant';
import { MatButtonModule } from '@angular/material/button';
import { FormularioMaestrosComponent } from './formulario-maestros/formulario-maestros.component';
import { GenericGridModule } from '../shared/components/generic-grid/generic-grid.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MaestroService } from './service/maestro.service';
import { TipoMaestroService } from '../tipo-maestro/service/tipo-maestro.service';
import { EstatusService } from '../estatus/service/estatus.service';

const routes: Routes = [
  {path: '', component: CatalogoMaestrosComponent,
   canActivate: [AuthGaurdService], data: {perfilAcceso: TIPO_PEFIL_ADMINISTRADOR}},
  {path: 'maestro/:id', component: FormularioMaestrosComponent,
   canActivate: [AuthGaurdService], data: {perfilAcceso: TIPO_PEFIL_ADMINISTRADOR}}
];

@NgModule({
  declarations: [
    CatalogoMaestrosComponent,
    FormularioMaestrosComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    GenericGridModule,

    MatProgressSpinnerModule,
    MatDialogModule,
    RouterModule.forChild(routes)
  ],
  providers: [MaestroService, TipoMaestroService, EstatusService]
})
export class CatalogoMaestrosModule { }
