import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { OnlyNumberDirective } from './directives/only-number.directive';
import { EliminarDialogComponent } from './components/eliminar-dialog/eliminar-dialog.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    OnlyNumberDirective,
    EliminarDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    OnlyNumberDirective,
    MatButtonModule
  ]
})
export class SharedModule { }
