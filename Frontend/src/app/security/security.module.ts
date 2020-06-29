import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from './service/authentication.service';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared/shared.module';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    SharedModule
  ],
  providers: [AuthenticationService]
})
export class SecurityModule { }
