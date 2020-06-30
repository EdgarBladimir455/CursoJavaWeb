import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SERVER_HOST } from 'src/app/shared/shared/constants/general-constant';
import { map } from 'rxjs/operators';
import { Usuario } from 'src/app/modelos/usuario';
import { Maestro } from 'src/app/modelos/maestro';
import { MaestroWrapper } from 'src/app/modelos/maestro-wrapper';
import { Pagination } from 'src/app/shared/components/generic-grid/generic-grid.component';

@Injectable({
  providedIn: 'root'
})
export class MaestroService {

  private readonly url = '/maestro';
  constructor(private httpClient: HttpClient) { }

  consultarActivos() {
    return this.httpClient.get(`${SERVER_HOST}${this.url}/consultarActivos`, {responseType: 'json'})
               .pipe(
                 map(response => response as Usuario[])
               );
  }

  consultarMaestro(idMaestro: number) {
    let param = new HttpParams();
    param = param.set('idMaestro', idMaestro.toString());

    return this.httpClient.get(`${SERVER_HOST}${this.url}/consultarMaestro`, {responseType: 'json', params: param})
               .pipe(
                 map(response => response as Usuario)
               );
  }

  consultarUsuariosConFiltros(maestro: Maestro, paginacion: Pagination) {
    let param = new HttpParams();
    param = param.set('pageSize', paginacion.pageSize.toString());
    param = param.set('pageIndex', paginacion.pageIndex.toString());

    return this.httpClient.get(`${SERVER_HOST}${this.url}/consultarUsuariosConFiltros`, {responseType: 'json', params: param})
               .pipe(
                 map(response => response as MaestroWrapper)
               );
  }

  agregarMaestro(maestro: Maestro) {
    return this.httpClient.post(`${SERVER_HOST}${this.url}/agregarMaestro`, maestro)
               .pipe(
                map(response => response as number)
               );
  }

  editarMaestro(maestro: Maestro) {
    return this.httpClient.post(`${SERVER_HOST}${this.url}/editarMaestro`, maestro)
               .pipe(
                map(response => response as number)
               );
  }

  eliminarMaestro(idMaestro: number) {
    return this.httpClient.post(`${SERVER_HOST}${this.url}/eliminarMaestro`, idMaestro)
               .pipe(
                 map(response => response as number)
                );
  }

}
