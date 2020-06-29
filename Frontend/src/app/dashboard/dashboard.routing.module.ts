import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AuthGaurdService } from '../security/service/auth-gaurd.service';
import { PerfilComponent } from '../perfil/perfil.component';
import { CatalogoGruposComponent } from '../catalogo-grupos/catalogo-grupos.component';
import { CatalogoMateriasComponent } from '../catalogo-materias/catalogo-materias.component';
import { TIPO_PEFIL_ADMINISTRADOR, TIPO_PEFIL_MAESTRO, TIPO_PEFIL_TODOS } from '../shared/shared/constants/general-constant';
import { CatalogoMaestrosModule } from '../catalogo-maestros/catalogo-maestros.module';
import { CatalogoAlumnosModule } from '../catalogo-alumnos/catalogo-alumnos.module';


const routes: Routes = [
  {path: 'inicio',
   component: DashboardComponent,
   children: [
     {path: '', pathMatch: 'full', redirectTo: 'perfil'},
     {path: 'perfil', component: PerfilComponent, canActivate: [AuthGaurdService], data: {perfilAcceso: TIPO_PEFIL_TODOS}},
     {path: 'catalogo-maestros', loadChildren: () => CatalogoMaestrosModule},
     {path: 'catalogo-alumnos', loadChildren: () => CatalogoAlumnosModule},
     {path: 'catalogo-grupos', component: CatalogoGruposComponent,
      canActivate: [AuthGaurdService], data: {perfilAcceso: TIPO_PEFIL_MAESTRO}},
     {path: 'catalogo-materias', component: CatalogoMateriasComponent,
      canActivate: [AuthGaurdService], data: {perfilAcceso: TIPO_PEFIL_MAESTRO}}
   ],
   canActivate: [AuthGaurdService]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
