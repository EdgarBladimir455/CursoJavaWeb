import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-formulario-maestros',
  templateUrl: './formulario-maestros.component.html',
  styleUrls: ['./formulario-maestros.component.scss']
})
export class FormularioMaestrosComponent implements OnInit {

  private idMaestro = null;

  public esEdicion = false;

  constructor(private activatedRoute: ActivatedRoute,
              private location: Location) {
    this.activatedRoute.params
    .subscribe((param) => {
      if (param['id'] && !isNaN(param['id'])) {
        this.idMaestro = param['id'];
        this.esEdicion = true;
      } else {
        this.esEdicion = false;
      }
    });
  }

  ngOnInit(): void {
  }

  regresar() {
    this.location.back();
  }

}
