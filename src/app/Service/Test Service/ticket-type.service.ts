import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { TicketTypeDtoModel } from '../../Models/TicketType/TicketType.Model';
import { Configs } from '../../Core/Utility/Config';

@Injectable({
  providedIn: 'root'
})
export class TicketTypeService {
  private apiUrl = Configs.apiUrl+'/v1/TicketType';  // Mock API endpoint

  constructor(private http: HttpClient) { }

  getTicketType(searchObj: any): Observable<TicketTypeDtoModel[]> {
    return this.http.post<any>(`${this.apiUrl}/GetLite`, searchObj);
  }

  getTicketTypeById(id: string): Observable<TicketTypeDtoModel> {
    return this.http.get<TicketTypeDtoModel>(`${this.apiUrl}/${id}`);
  }

  createTicketType(ticket: TicketTypeDtoModel): Observable<TicketTypeDtoModel> {
    return  this.http.post<TicketTypeDtoModel>(`${this.apiUrl}/Add`, ticket);
  }
}
