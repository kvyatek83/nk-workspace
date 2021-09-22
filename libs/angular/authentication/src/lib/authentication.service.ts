import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export const AUTHENTICATION_OPTIONS = new InjectionToken<AuthenticationOptions>(
  'AuthenticationOptions'
);

export interface AuthenticationOptions {
  api: string;
}

export enum Role {
  User = 'User',
  Admin = 'Admin',
}

export interface User {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  role: Role;
  token?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  authOptions: AuthenticationOptions;

  private _currentUser$ = new BehaviorSubject<User>(
    JSON.parse(localStorage.getItem('currentUser') as string)
  );

  users: User[] = [
    {
      id: 1,
      username: 'admin',
      password: 'admin',
      firstName: 'Admin',
      lastName: 'User',
      role: Role.Admin,
    },
    {
      id: 2,
      username: 'user',
      password: 'user',
      firstName: 'Normal',
      lastName: 'User',
      role: Role.User,
    },
  ];

  get currentUser$(): Observable<User> {
    return this._currentUser$.asObservable();
  }

  get currentUserValue(): User {
    return this._currentUser$.value;
  }

  constructor(
    @Inject(AUTHENTICATION_OPTIONS) private authenticationOptions: AuthenticationOptions,
    private http: HttpClient
  ) {
    this.authOptions = authenticationOptions
    console.log(authenticationOptions);
  }

  // login(email: string, password: string): Observable<User> {
  //   return this.http.post<User>('/api/login', { email, password });
  // }

  login(username: string, password: string): Observable<User> {
    return this.http
      .post<User>(`${this.authOptions.api}/users/authenticate`, {
        username,
        password,
      })
      .pipe(
        map((user) => {
          // login successful if there's a jwt token in the response
          if (user && user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            this._currentUser$.next(user);
          }

          return user;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this._currentUser$.next(null);
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
