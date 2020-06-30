import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './security/login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HtppInterceptorService } from './security/service/htpp-interceptor-service.service';
import { SecurityModule } from './security/security.module';
import { SharedModule } from './shared/shared/shared.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { MaterialModule } from './material.module';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomPaginatorIntlService } from './shared/util/custom-paginator-intl.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PerfilComponent } from './perfil/perfil.component';
import { CatalogoGruposComponent } from './catalogo-grupos/catalogo-grupos.component';
import { CatalogoMateriasComponent } from './catalogo-materias/catalogo-materias.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    PerfilComponent
  ],
  imports: [
    SecurityModule,
    DashboardModule,

    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HtppInterceptorService,
    multi: true
  }, {
    provide: MatPaginatorIntl,
    useClass: CustomPaginatorIntlService
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
