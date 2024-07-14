import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { VehicleOwnerLiteModel } from '../../Models/VehicleOwner/VehicleOwner.Model';

@Injectable({
  providedIn: 'root'
})
export class VehicleOwnerService {

  private apiUrl = 'http://deliveryportal.runasp.net/api/v1/VehicleOwner';  // Mock API endpoint

  constructor(private http: HttpClient) { }

  getVehicleOwnerLite(searchObj: any): Observable<VehicleOwnerLiteModel[]> {
    return this.http.post<any>(`${this.apiUrl}/GetLite`,searchObj).pipe(
      map(response => response.data)
    );
  }

}
