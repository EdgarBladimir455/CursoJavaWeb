import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_HOST } from 'src/app/shared/shared/constants/general-constant';
import { Estatus } from 'src/app/modelos/estatus';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EstatusService {

  private readonly url = '/estatus';
  constructor(private httpClient: HttpClient) { }

  consultar() {
    return this.httpClient.get(`${SERVER_HOST}${this.url}/consultar`, {responseType: 'json'})
    .pipe(
      map(response => response as Estatus[])
    );
  }

}
