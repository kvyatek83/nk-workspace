import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { LocalStorageBehaviorSubject } from '@nk-workspace/utils/angular-utils';
import { Observable } from 'rxjs';
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

export interface UserProfile {
  id: number;
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
  role: Role;
  token?: string;
}

export interface LoginUser {
  username: string;
  password: string;
}

export interface RegisterUser {
  username: string;
  email: string;
  password: string;
  repassword: string;
  firstName: string;
  lastName: string;
  role: Role;
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  authOptions: AuthenticationOptions;

  private _currentUser$ = new LocalStorageBehaviorSubject<UserProfile>(
    'user-profile',
    null
  );

  // private _currentUser$ = new BehaviorSubject<User>(
  //   JSON.parse(localStorage.getItem('currentUser') as string)
  // );

  users: UserProfile[] = [
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

  get currentUser$(): Observable<UserProfile> {
    return this._currentUser$.asObservable();
  }

  get currentUserValue(): UserProfile {
    return this._currentUser$.value;
  }

  constructor(
    @Inject(AUTHENTICATION_OPTIONS)
    private authenticationOptions: AuthenticationOptions,
    private http: HttpClient
  ) {
    this.authOptions = authenticationOptions;
    console.log(authenticationOptions);
  }

  login(username: string, password: string): Observable<UserProfile> {
    return this.http
      .post<UserProfile>(`${this.authOptions.api}/users/authenticate`, {
        username,
        password,
      })
      .pipe(
        map((user) => {
          // login successful if there's a jwt token in the response
          if (user && user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            // localStorage.setItem('currentUser', JSON.stringify(user));
            this._currentUser$.next(user);
          }

          return user;
        })
      );
  }

  logout(): void {
    // remove user from local storage to log user out
    // localStorage.removeItem('currentUser');
    this._currentUser$.next(null);
  }
}
