import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

export class User {
  constructor(
    public status: string,
     ) {}

}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient,
              private router: Router) {}


  authenticate(username, password) {
    return this.httpClient.post<any>('http://localhost:8080/authenticate',{username,password}).pipe(
     map(
       userData => {
        sessionStorage.setItem('username',username);
        let tokenStr= 'Bearer '+userData.token;
        sessionStorage.setItem('token', tokenStr);
        return userData;
       }
     )
    );
  }

  registrarAdmin(usuario: string, contrasena: string) {
    return this.httpClient.post<any>('http://localhost:8080/usuario/register', {username: usuario, password: contrasena}).pipe(
      map(
        userData => {
         return userData;
        }
      )
     );
  }

  isUserLoggedIn() {
    const user = sessionStorage.getItem('username');
    console.log(!(user === null));
    return !(user === null);
  }

  logOut() {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }
}
