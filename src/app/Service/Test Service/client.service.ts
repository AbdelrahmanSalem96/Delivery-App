import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClientModel, DeleteClientModel, getLightClientModel } from '../../Models/Client/Client.Model';
import { SearchObj } from '../../Core/SearchControls/Common/SearchObj';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = 'http://deliveryportal.runasp.net/api/v1/Client';  // Mock API endpoint

  constructor(private http: HttpClient) { }

  getClients(data: any): Observable<ClientModel[]> {
    return this.http.post<any>(`${this.apiUrl}/GetPaggedResult`, data);
  }

  getClientsGetLite(searchObj: any): Observable<getLightClientModel> {
    return this.http.post<any>(`${this.apiUrl}/GetLite`, searchObj).pipe(
      map(response => response.data)
    );
  }

  getClientsByApplicationUserId(id: string): Observable<ClientModel> {
    return this.http.get<ClientModel>(`${this.apiUrl}/GetClientByApplicationUserId/${id}`);
  }

  getClientById(id: string): Observable<ClientModel> {
    return this.http.get<ClientModel>(`${this.apiUrl}/${id}`);
  }

  createClient(client: ClientModel): Observable<ClientModel> {
    return  this.http.post<ClientModel>(`${this.apiUrl}/add`, client);
  }

  updateClient(client: ClientModel): Observable<ClientModel> {
    return this.http.post<ClientModel>(`${this.apiUrl}/update`, client);
  }

  deleteClient(obj: DeleteClientModel): Observable<DeleteClientModel> {
    return this.http.post<DeleteClientModel>(`${this.apiUrl}/delete`, obj);
  }
}
