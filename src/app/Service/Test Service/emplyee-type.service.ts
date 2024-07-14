import { Injectable } from '@angular/core';
import { EmployeeModel } from '../../Models/Employee/Employee.Model';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmplyeeTypeService {

  private apiUrl = 'http://deliveryportal.runasp.net/api/v1/EmploymentType';  // Mock API endpoint

  constructor(private http: HttpClient) { }

  getEmplyeeTypes(searchObj: any): Observable<EmployeeModel[]> {
    return this.http.post<EmployeeModel>(`${this.apiUrl}/GetLite`, searchObj).pipe(
      map((response:any )=> response.data)
    );
  }

  getEmplyeeTypeById(id: string): Observable<EmployeeModel> {
    return this.http.get<EmployeeModel>(`${this.apiUrl}/${id}`);
  }

}
