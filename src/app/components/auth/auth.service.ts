import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from './user';

@Injectable()
export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private path = `http://localhost:2000/api/v1`;
  private _isLoggedin$ = new BehaviorSubject<boolean>(false);
  private readonly TOKEN_NAME = 'user_auth';
  public isLoggedIn = this._isLoggedin$.asObservable();

  get token() {
    return sessionStorage.getItem(this.TOKEN_NAME);
  }

  constructor(
    private router: Router,
    private http: HttpClient
  ) {this._isLoggedin$.next(!!this.token)}


  public login(loginDetails: any): Observable<any> {
    return this.http.post<any>(`${this.path}/login`, loginDetails).pipe(
      tap((res: any) => {
        this._isLoggedin$.next(true);
        sessionStorage.setItem(this.TOKEN_NAME, res.token);
        sessionStorage.setItem('userId', res.data._id);

        sessionStorage.setItem('loggedInUser', JSON.stringify(res));

      })
    );
  }

  public register(registerDetails: any): Observable<any> {
    return this.http.post<any>(`${this.path}/register`, registerDetails).pipe(
      tap((res: any) => {
        this.router.navigate(['/login'])
      })
    );
  }

  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
