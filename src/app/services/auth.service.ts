import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  UserLogin,
  UserLoginResponse,
  UserRegister,
  UserRegisterResponse,
} from '../models/IUser';
import {  Observable, tap } from 'rxjs';
import { environment } from '../environments/env';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  http$ = inject(HttpClient);
  router = inject(Router);

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

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

    return storedUser;
  }

  verify(): boolean {
    const user = this.getUser();

    if (!user?.access_token) return false;

    return true;
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
