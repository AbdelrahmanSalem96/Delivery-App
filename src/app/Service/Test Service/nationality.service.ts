import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NationalityDtoModel } from '../../Models/Nationality/Nationality.Model';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NationalityService {

  private apiUrl = 'http://deliveryportal.runasp.net/api/v1/Nationality';  // Mock API endpoint

  constructor(private http: HttpClient) { }

  getNatonalities(searchObj: any): Observable<NationalityDtoModel[]> {
    return this.http.post<NationalityDtoModel>(`${this.apiUrl}/GetLite`, searchObj).pipe(
      map((response:any )=> response.data)
    );
  }

  getNatonalityById(id: string): Observable<NationalityDtoModel> {
    return this.http.get<NationalityDtoModel>(`${this.apiUrl}/${id}`);
  }
}
