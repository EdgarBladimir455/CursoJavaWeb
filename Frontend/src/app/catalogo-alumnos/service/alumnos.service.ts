import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SERVER_HOST } from 'src/app/shared/shared/constants/general-constant';
import { map } from 'rxjs/operators';
import { Usuario } from 'src/app/modelos/usuario';
import { Alumno } from 'src/app/modelos/alumno';
import { Pagination } from 'src/app/shared/components/generic-grid/generic-grid.component';
import { AlumnoWrapper } from 'src/app/modelos/alumno-wrapper';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  private readonly url = '/alumno';
  constructor(private httpClient: HttpClient) { }

  consultarActivos() {
    return this.httpClient.get(`${SERVER_HOST}${this.url}/consultarActivos`, {responseType: 'json'})
               .pipe(
                 map(response => response as Usuario[])
               );
  }

  consultarAlumno(idAlumno: number) {
    let param = new HttpParams();
    param = param.set('idAlumno', idAlumno.toString());

    return this.httpClient.get(`${SERVER_HOST}${this.url}/consultarAlumno`, {responseType: 'json', params: param})
               .pipe(
                 map(response => response as Usuario)
               );
  }

  consultarUsuariosConFiltros(alumno: Alumno, paginacion: Pagination) {
    let param = new HttpParams();
    param = param.set('pageSize', paginacion.pageSize.toString());
    param = param.set('pageIndex', paginacion.pageIndex.toString());

    return this.httpClient.get(`${SERVER_HOST}${this.url}/consultarUsuariosConFiltros`, {responseType: 'json', params: param})
               .pipe(
                 map(response => response as AlumnoWrapper)
               );
  }

  agregarAlumno(alumno: Alumno) {
    return this.httpClient.post(`${SERVER_HOST}${this.url}/agregarAlumno`, alumno)
               .pipe(
                map(response => response as number)
               );
  }

  editarAlumno(alumno: Alumno) {
    return this.httpClient.post(`${SERVER_HOST}${this.url}/editarAlumno`, alumno)
               .pipe(
                map(response => response as number)
               );
  }

  eliminarAlumno(idAlumno: number) {
    return this.httpClient.post(`${SERVER_HOST}${this.url}/eliminarAlumno`, idAlumno)
               .pipe(
                 map(response => response as number)
                );
  }

}
