import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { InitialConstants } from '../../Core/Constant/InitialConstant';
import { Configs } from '../../Core/Utility/Config';

export class Vehicle{
  id?:string;
  name!: string;
  brand!: string;
  number!: string;
  rcBookExpiryDate?: string;
  rcBookExpiryDateImage!: string;
  rcBookExpiryDateImagePath!: string;
  insuranceExpiryDate?: string;
  insuranceExpiryDateImage!: string
  insuranceExpiryDateImagePath!: string;
  currantRunningKM!: number;
  areaId!:string ;
  vehicleTypeId!: string;
  vehicleOwnerType!: number;
  vehicleStateId!: string;
  applicationOwnerIdentityUserId!: string;
  createdById?: string;
  lastUpdatedById?: string;
}

export class DeleteVehicleDtoModel{
  id:string= InitialConstants.DefaultString;
  deletedById:string = InitialConstants.DefaultString;
}

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private apiUrl = Configs.apiUrl+'/v1/Vehicle';  // Mock API endpoint

  constructor(private http: HttpClient) { }

  getVehiclesLite(searchObj: any): Observable<Vehicle[]> {
    return this.http.post<any>(`${this.apiUrl}/GetLite`,searchObj).pipe(
      map((response:any )=> response.data)
    );
  }

  getVehicles(data: any): Observable<Vehicle[]> {
    return this.http.post<any>(`${this.apiUrl}/GetPaggedResult`, data);
  }

  getVehicleById(id: string): Observable<Vehicle> {
    return this.http.get<Vehicle>(`${this.apiUrl}/${id}`);
  }

  createVehicle(vehicle: Vehicle): Observable<Vehicle> {
    return  this.http.post<Vehicle>(`${this.apiUrl}/add`, vehicle);
  }

  updateVehicle(vehicle: Vehicle): Observable<Vehicle> {
    return this.http.post<Vehicle>(`${this.apiUrl}/update`, vehicle);
  }

  deleteVehicle(obj: DeleteVehicleDtoModel): Observable<DeleteVehicleDtoModel> {
    return this.http.post<DeleteVehicleDtoModel>(`${this.apiUrl}/delete`, obj);
  }
}
