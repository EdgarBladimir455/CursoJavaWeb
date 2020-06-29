import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-eliminar-dialog',
  templateUrl: './eliminar-dialog.component.html',
  styleUrls: ['./eliminar-dialog.component.scss']
})
export class EliminarDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EliminarDialogComponent>) { }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close(false);
  }

  aceptar() {
    this.dialogRef.close(true);
  }

}
