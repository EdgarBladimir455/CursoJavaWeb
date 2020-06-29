import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericGridComponent } from './generic-grid.component';
import { CdkTableModule } from '@angular/cdk/table';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    GenericGridComponent
  ],
  imports: [
    CommonModule,
    CdkTableModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [
    CdkTableModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    GenericGridComponent
  ]
})
export class GenericGridModule { }
