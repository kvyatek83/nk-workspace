import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) {
  }

  login(email: string, password: string ): Observable<any> {
      return this.http.post<any>('/api/login', {email, password});
  }
        
  // private setSession(authResult) {
  //     const expiresAt = moment().add(authResult.expiresIn,'second');

  //     localStorage.setItem('id_token', authResult.idToken);
  //     localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
  // }          

  // logout() {
  //     localStorage.removeItem("id_token");
  //     localStorage.removeItem("expires_at");
  // }

  // public isLoggedIn() {
  //     return moment().isBefore(this.getExpiration());
  // }

  // isLoggedOut() {
  //     return !this.isLoggedIn();
  // }

  // getExpiration() {
  //     const expiration = localStorage.getItem("expires_at");
  //     const expiresAt = JSON.parse(expiration);
  //     return moment(expiresAt);
  // }   
}