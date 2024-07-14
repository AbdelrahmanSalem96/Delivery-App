import { Injectable } from '@angular/core';
import { ClientBranchModel, DeleteBranchModel, LightBranchModel } from '../../Models/Client Branch/ClientBranch.Model';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { HttpClient } from '@angular/common/http';
import { SearchObj } from '../../Core/SearchControls/Common/SearchObj';

@Injectable({
  providedIn: 'root'
})
export class ClientBranchService {
  private apiUrl = 'http://deliveryportal.runasp.net/api/v1/ClientBranch';

  constructor(private http: HttpClient) { }

  getClientBranches(data: any): Observable<ClientBranchModel[]> {
    return this.http.post<any>(`${this.apiUrl}/GetPaggedResult`, data);
  }

  getBranchesGetLite(data: any): Observable<LightBranchModel[]> {
    return this.http.post<any>(`${this.apiUrl}/GetLite`, data);
  }

  getClientBranchById(id: string): Observable<ClientBranchModel> {
    return this.http.get<ClientBranchModel>(`${this.apiUrl}/${id}`);
  }

  getClientBranchByAppUserId(id: string): Observable<ClientBranchModel> {
    return this.http.get<ClientBranchModel>(`${this.apiUrl}/GetClientBranchByApplicationUserId/${id}`);
  }

  createClientBranch(branch: ClientBranchModel): Observable<ClientBranchModel> {
    return  this.http.post<ClientBranchModel>(`${this.apiUrl}/add`, branch);
  }

  updateClientBranch(branch: ClientBranchModel): Observable<ClientBranchModel> {
    return this.http.post<ClientBranchModel>(`${this.apiUrl}/Update`, branch);
  }

  deleteClientBranch(obj: DeleteBranchModel): Observable<DeleteBranchModel> {
    return this.http.post<DeleteBranchModel>(`${this.apiUrl}/Delete`, obj );
  }
}

