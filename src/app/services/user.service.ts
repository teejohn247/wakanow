import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from '../components/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private dataSubject = new BehaviorSubject<any[]>([]);
  public data$ = this.dataSubject.asObservable();

  setData(data: any[]) {
    this.dataSubject.next(data);
  }

  private path = `https://xp-backup-d9e0a88b3530.herokuapp.com/api/v1`;
  //private token = `${environment.token}`;

  headerParams = {
    'Authorization': window.sessionStorage.getItem('user_auth') || ''
  }
  requestOptions = {
    headers: new HttpHeaders(this.headerParams)
  }

  constructor(private http: HttpClient, private authService: AuthService) { }

  /*************** EMPLOYEE RELATED ACTIONS ***************/


  //Get the list of all employees
  public getUsers(): Observable<any> {
    return this.http.get<any>(`${this.path}/fetchUsers?page=1&limit=100`, this.requestOptions);
  }

  public getUserDetails(id: string): Observable<any> {
    return this.http.get<any>(`${this.path}/fetchUsers/${id}`, this.requestOptions);
  }
  public addUser(info: any): Observable<any> {
    return this.http.post<any>(`${this.path}/addUser`, info, this.requestOptions);
  }

  public editUser(id: string, data: any): Observable<any> {
    return this.http.patch<any>(`${this.path}/editUser/${id}`, data, this.requestOptions);
  }
  //Delete
  public deleteUser(id: any): Observable<any> {
    return this.http.delete<any>(`${this.path}/deleteUser/${id}`, this.requestOptions);
  }
}
