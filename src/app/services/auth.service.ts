import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  UserLogin,
  UserLoginResponse,
  UserRegister,
  UserRegisterResponse,
} from '../models/IUser';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../environments/env';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  http$ = inject(HttpClient);
  router = inject(Router);

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  private user$ = new BehaviorSubject<UserLoginResponse | null>(null);

  constructor() {}

  setUser(user: UserLoginResponse): void {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }

  getUser(): UserLoginResponse | null {
    let storedUser: UserLoginResponse | null = null;

    const user = localStorage.getItem('user');

    if (user) {
      storedUser = JSON.parse(user);
    }

    return this.user$.value || storedUser;
  }

  verify(): boolean {
    const user = this.getUser();
    if (!user) return false;

    if (this.parseJwt(user.access_token).exp * 1000 < new Date().getTime()) {
      this.logout();
    }

    return true;
  }
  private parseJwt(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    return JSON.parse(jsonPayload);
  }

  login(value: UserLogin): Observable<UserLoginResponse> {
    return this.http$
      .post<UserLoginResponse>(
        environment.api + 'login',
        JSON.stringify(value),
        { headers: this.headers }
      )
      .pipe(
        tap((res) => {
          this.setUser(res);
        })
      );
  }

  signup(value: UserRegister): Observable<UserRegisterResponse> {
    return this.http$.post<UserRegisterResponse>(
      environment.api + 'register',
      JSON.stringify(value),
      { headers: this.headers }
    );
  }
  logout() {
    localStorage.removeItem('user');
    this.router.navigateByUrl('/login');
  }
}
