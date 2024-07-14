import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { VehicleTypeDtoModel } from '../../Models/VehicleType/VehicleType.Model';
import { Configs } from '../../Core/Utility/Config';

@Injectable({
  providedIn: 'root'
})
export class VehicleTypeService {

  private apiUrl = Configs.apiUrl+'/v1/VehicleType';  // Mock API endpoint

  constructor(private http: HttpClient) { }

  getVehicleTypes(searchObj: any): Observable<VehicleTypeDtoModel[]> {
    return this.http.post<VehicleTypeDtoModel>(`${this.apiUrl}/GetLite`, searchObj).pipe(
      map((response:any )=> response.data)
    );
  }

  getVehicleTypeById(id: string): Observable<VehicleTypeDtoModel> {
    return this.http.get<VehicleTypeDtoModel>(`${this.apiUrl}/${id}`);
  }
}
