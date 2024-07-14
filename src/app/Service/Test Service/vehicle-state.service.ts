import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { VehicleStateDtoModel } from '../../Models/VehicleState/VehicleState.Model';
import { Configs } from '../../Core/Utility/Config';

@Injectable({
  providedIn: 'root'
})
export class VehicleStateService {

  private apiUrl = Configs.apiUrl+'/v1/VehicleState';  // Mock API endpoint

  constructor(private http: HttpClient) { }

  getVehicleStateLite(searchObj: any): Observable<VehicleStateDtoModel[]> {
    return this.http.post<any>(`${this.apiUrl}/GetLite`,searchObj).pipe(
      map(response => response.data)
    );
  }

}
