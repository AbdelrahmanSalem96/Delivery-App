import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { VehicleStateDtoModel } from '../../Models/VehicleState/VehicleState.Model';

@Injectable({
  providedIn: 'root'
})
export class VehicleStateService {

  private apiUrl = 'http://deliveryportal.runasp.net/api/v1/VehicleState';  // Mock API endpoint

  constructor(private http: HttpClient) { }

  getVehicleStateLite(searchObj: any): Observable<VehicleStateDtoModel[]> {
    return this.http.post<any>(`${this.apiUrl}/GetLite`,searchObj).pipe(
      map(response => response.data)
    );
  }

}
