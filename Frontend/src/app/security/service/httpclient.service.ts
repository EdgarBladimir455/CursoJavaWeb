import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SERVER_HOST } from 'src/app/shared/shared/constants/general-constant';

export class Employee{
  constructor(
    public empId: string,
    public name: string,
    public designation: string,
    public salary: string,
  ) {}
}

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient: HttpClient) {}

  consultarUsuarioEnSession() {
    const usuario = sessionStorage.getItem('username');
    return this.httpClient.get(`${SERVER_HOST}/usuario/consultar?usuario=${usuario}`);
  }


}
