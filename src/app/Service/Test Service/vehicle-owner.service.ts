import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { VehicleOwnerLiteModel } from '../../Models/VehicleOwner/VehicleOwner.Model';
import { Configs } from '../../Core/Utility/Config';

@Injectable({
  providedIn: 'root'
})
export class VehicleOwnerService {

  private apiUrl = Configs.apiUrl+'/v1/VehicleOwner';  // Mock API endpoint

  constructor(private http: HttpClient) { }

  getVehicleOwnerLite(searchObj: any): Observable<VehicleOwnerLiteModel[]> {
    return this.http.post<any>(`${this.apiUrl}/GetLite`,searchObj).pipe(
      map(response => response.data)
    );
  }

}
