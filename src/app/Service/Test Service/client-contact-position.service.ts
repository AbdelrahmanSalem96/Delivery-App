import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientContactPositionDtoModel } from '../../Models/ClientContactPosition/ClientContactPosition.Model';
import { SearchObj } from '../../Core/SearchControls/Common/SearchObj';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientContactPositionService {
  private apiUrl = 'http://deliveryportal.runasp.net/api/v1/ClientContactPosition/GetLite';  // Mock API endpoint

  constructor(private http: HttpClient) { }

  getPsitions(searchObj: any): Observable<ClientContactPositionDtoModel[]> {
    return this.http.post<ClientContactPositionDtoModel>(`${this.apiUrl}`, searchObj).pipe(
      map((response:any )=> response.data)
    );
  }
}
