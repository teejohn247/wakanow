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

  private path = `http://localhost:2000/api/v1`;
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
    console.log(this.authService.token);
    return this.http.get<any>(`${this.path}/fetchUsers?page=1&limit=100`, this.requestOptions);
  }

  public getUserDetails(id: string): Observable<any> {
    console.log('heree');
    return this.http.get<any>(`${this.path}/fetchUsers/${id}`, this.requestOptions);
  }
  //Create a new employee
  public addUser(info: any): Observable<any> {
    return this.http.post<any>(`${this.path}/addUser`, info, this.requestOptions);
  }

  // return this.http.patch<any>(`${this.path}/updateDesignation/${designationId}`, data, this.requestOptions);


  public editUser(id: string, data: any): Observable<any> {
    return this.http.patch<any>(`${this.path}/editUser/${id}`, data, this.requestOptions);
  }

  //Delete
  public deleteUser(id: any): Observable<any> {
    return this.http.delete<any>(`${this.path}/deleteUser/${id}`, this.requestOptions);
  }

  //Bulk employee upload
  public bulkEmployeeUpload(file: any): Observable<any> {
    return this.http.post<any>(`${this.path}/uploadBulkEmployees`, file, this.requestOptions);
  }

  //Get the list of all employees
  public getEmployees(): Observable<any> {
    return this.http.get<any>(`${this.path}/fetchEmployees?page=1&limit=100`, this.requestOptions);
  }

  //Get an employee details
   public getEmployeeDetails(employeeId: string): Observable<any> {
    return this.http.get<any>(`${this.path}/fetchEmployee/${employeeId}`, this.requestOptions);
  }

  //Delete employee
  public deleteEmployee(employeeId: any): Observable<any> {
    return this.http.delete<any>(`${this.path}/deleteEmployee/${employeeId}`, this.requestOptions);
  }

  /*************** DEPARTMENT RELATED ACTIONS ***************/

  //Create a new department
  public createDepartment(departmentName: any): Observable<any> {
    return this.http.post<any>(`${this.path}/addDepartment`, departmentName, this.requestOptions);
  }

  //Get the list of all Departments
  public getDepartments(): Observable<any> {
    return this.http.get<any>(`${this.path}/fetchDepartments`, this.requestOptions);
  }

  //Update Department
  public updateDepartment(data: any, departmentId: any): Observable<any> {
    return this.http.patch<any>(`${this.path}/updateDepartment/${departmentId}`, data, this.requestOptions);
  }

  //Delete department
  public deleteDepartment(deptId: any): Observable<any> {
    return this.http.delete<any>(`${this.path}/deleteDepartment/${deptId}`, this.requestOptions);
  }

  /*************** COMPANY ROLES RELATED ACTIONS ***************/

  //Create a new company role
  public createCompanyRole(roleName: any): Observable<any> {
    return this.http.post<any>(`${this.path}/addRole`, roleName, this.requestOptions);
  }

  //Get the list of all Company Roles
  public getCompanyRoles(): Observable<any> {
    return this.http.get<any>(`${this.path}/fetchCompanyRoles`, this.requestOptions);
  }


  /*************** DESIGNATIONS RELATED ACTIONS ***************/

  //Create a new designation
  public createDesignation(designationName: any): Observable<any> {
    return this.http.post<any>(`${this.path}/createDesignation`, designationName, this.requestOptions);
  }

  //Get the list of all Designations
  public getDesignations(): Observable<any> {
    return this.http.get<any>(`${this.path}/fetchDesignations`, this.requestOptions);
  }

  //Update designation
  public updateDesignation(data: any, designationId: any): Observable<any> {
    return this.http.patch<any>(`${this.path}/updateDesignation/${designationId}`, data, this.requestOptions);
  }

  //Delete designation
  public deleteDesignation(designationId: any): Observable<any> {
    return this.http.delete<any>(`${this.path}/deleteDesignation/${designationId}`, this.requestOptions);
  }

  /*************** LEAVE TYPES RELATED ACTIONS ***************/

  //Create a new leave type
  public createLeaveType(leaveTypeName: any): Observable<any> {
    return this.http.post<any>(`${this.path}/createLeave`, leaveTypeName, this.requestOptions);
  }

  //Get the list of all Leave Types
  public getLeaveTypes(): Observable<any> {
    return this.http.get<any>(`${this.path}/fetchLeave`, this.requestOptions);
  }

  //Update Leave Type
  public updateLeaveType(data: any, leaveTypeId: any): Observable<any> {
    return this.http.patch<any>(`${this.path}/updateLeave/${leaveTypeId}`, data, this.requestOptions);
  }

  //Delete department
  public deleteLeaveType(leaveId: any): Observable<any> {
    return this.http.delete<any>(`${this.path}/deleteLeave/${leaveId}`, this.requestOptions);
  }

  /*************** LEAVE APPLICATIONS RELATED ACTIONS ***************/

  //Create a new leave request
  public createLeaveRequest(leaveDetails: any): Observable<any> {
    return this.http.post<any>(`${this.path}/leaveApplication`, leaveDetails, this.requestOptions);
  }

  //Update Leave Request
  public updateLeaveRequest(data: any, leaveId: any): Observable<any> {
    return this.http.patch<any>(`${this.path}/updateLeaveApplication/${leaveId}`, data, this.requestOptions);
  }

  //Delete leave request
  public deleteLeaveRequest(leaveId: any): Observable<any> {
    return this.http.delete<any>(`${this.path}/deleteLeaveApplication/${leaveId}`, this.requestOptions);
  }

  //Get the list of all leave applications
  public getLeaveRequests(): Observable<any> {
    return this.http.get<any>(`${this.path}/getLeaveRecords`, this.requestOptions);
  }

  //Get the list of all requested leave applications
  public getRequestedLeaveApprovals(): Observable<any> {
    return this.http.get<any>(`${this.path}/fetchRequestedLeaves`, this.requestOptions);
  }

  //Approve or Decline a leave request
  public actionLeaveRequest(leaveDetails: any): Observable<any> {
    return this.http.patch<any>(`${this.path}/leaveAction`, leaveDetails, this.requestOptions);
  }

}
