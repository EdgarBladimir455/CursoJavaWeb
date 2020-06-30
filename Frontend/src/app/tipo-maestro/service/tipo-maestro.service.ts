import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_HOST } from 'src/app/shared/shared/constants/general-constant';
import { map } from 'rxjs/operators';
import { TipoMaestro } from 'src/app/modelos/tipo-maestro';

@Injectable({
  providedIn: 'root'
})
export class TipoMaestroService {

  private readonly url = '/tipoMaestro';
  constructor(private httpClient: HttpClient) { }

  consultar() {
    return this.httpClient.get(`${SERVER_HOST}${this.url}/consultar`, {responseType: 'json'})
    .pipe(
      map(response => response as TipoMaestro[])
    );
  }
}
