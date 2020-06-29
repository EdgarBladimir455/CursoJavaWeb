import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './security/login/login.component';
import { DashboardRoutingModule } from './dashboard/dashboard.routing.module';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '**', redirectTo: 'inicio'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {useHash: true}),
    DashboardRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
