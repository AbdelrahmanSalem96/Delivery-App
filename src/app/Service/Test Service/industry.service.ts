import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ClientIndustryDtoModel } from '../../Models/ClientIndustry/ClientIndustry.Model';
import { SearchObj } from '../../Core/SearchControls/Common/SearchObj';

@Injectable({
  providedIn: 'root'
})
export class IndustryService {
  private apiUrl = 'http://deliveryportal.runasp.net/api/v1/ClientIndustry/GetLite';  // Mock API endpoint

  constructor(private http: HttpClient) { }

  getiIndustries(searchObj: any): Observable<ClientIndustryDtoModel[]> {
    return this.http.post<ClientIndustryDtoModel>(`${this.apiUrl}`, searchObj).pipe(
      map((response:any )=> response.data)
    );
  }
}
