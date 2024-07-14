import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CommissionRuleDtoModel } from '../../Models/CommissionRule/CommissionRule.Model';

@Injectable({
  providedIn: 'root'
})
export class CommissionRoleService {
  private apiUrl = 'http://deliveryportal.runasp.net/api/v1/CommissionRule';  // Mock API endpoint

  constructor(private http: HttpClient) { }

  getCommissionRoles(searchObj: any): Observable<CommissionRuleDtoModel[]> {
    return this.http.post<CommissionRuleDtoModel>(`${this.apiUrl}/GetLite`, searchObj).pipe(
      map((response:any )=> response.data)
    );
  }

  getCommissionRoleById(id: string): Observable<CommissionRuleDtoModel> {
    return this.http.get<CommissionRuleDtoModel>(`${this.apiUrl}/${id}`);
  }
}
