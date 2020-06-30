import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AuthGaurdService } from '../security/service/auth-gaurd.service';
import { PerfilComponent } from '../perfil/perfil.component';
import { TIPO_PEFIL_TODOS } from '../shared/shared/constants/general-constant';
import { CatalogoMaestrosModule } from '../catalogo-maestros/catalogo-maestros.module';
import { CatalogoAlumnosModule } from '../catalogo-alumnos/catalogo-alumnos.module';
import { CatalogoGruposModule } from '../catalogo-grupos/catalogo-grupos.module';
import { CatalogoMateriasModule } from '../catalogo-materias/catalogo-materias.module';


const routes: Routes = [
  {path: 'inicio',
   component: DashboardComponent,
   children: [
     {path: '', pathMatch: 'full', redirectTo: 'perfil'},
     {path: 'perfil', component: PerfilComponent, canActivate: [AuthGaurdService], data: {perfilAcceso: TIPO_PEFIL_TODOS}},
     {path: 'catalogo-maestros', loadChildren: () => CatalogoMaestrosModule},
     {path: 'catalogo-alumnos', loadChildren: () => CatalogoAlumnosModule},
     {path: 'catalogo-grupos', loadChildren: () => CatalogoGruposModule},
     {path: 'catalogo-materias', loadChildren: () => CatalogoMateriasModule}
   ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
