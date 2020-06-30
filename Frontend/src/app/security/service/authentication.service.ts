import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SERVER_HOST } from 'src/app/shared/shared/constants/general-constant';

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
    return this.httpClient.post<any>(`${SERVER_HOST}/authenticate`, {username, password}).pipe(
     map(
       userData => {
        sessionStorage.setItem('username', username);
        const tokenStr = 'Bearer ' + userData.token;
        sessionStorage.setItem('token', tokenStr);
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
