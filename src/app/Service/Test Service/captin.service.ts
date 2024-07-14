import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { CaptinDtoModel, DeleteCaptinDtoModel } from '../../Models/Captin/Captin.Model';
import { Configs } from '../../Core/Utility/Config';

export class Captin {
  id?: string;
  name!: string;
  email!: string;
  telephone!: string;
  phoneNumber?: string;
  password?: string;
  nationalId?: string;
  nationalityId?:string;
  nationalIdImage?: string;
  nationalIdImagePath?: string;
  nationalIdExpiryDate?: string;
  driverLicense?: string;
  driverLicenseImage?: string;
  driverLicenseImagePath?: string;
  driverLicenseExpiryDate?: string;
  drivingLicense?: string;
  drivingLicenseImage?: string;
  drivingLicenseImagePath?: string;
  drivingLicenseExpiryDate?: string;
  contractFile?: string;
  contractFilePath?: string;
  joinedDate?: string;
  orderAmount?: number;
  monthlySalary?: number;
  captinState!: number;
  captinWorkingRegionId?:string;
  captainAreas!:string[];
  activationStateId?: string;
  employmentTypeId?: string;
  vehicleTypeId?:string;
  assignVehicleId?:string;
  commissionRuleId?: string;
  priorityAssign!: number;
  createdById?:string;
  lastUpdatedById?:string;
}


@Injectable({
  providedIn: 'root'
})
export class CaptinService {
  private apiUrl = Configs.apiUrl+'/v1/Captin';  // Mock API endpoint

  constructor(private http: HttpClient) { }

  getAllCaptins(data: any): Observable<Captin[]> {
    return this.http.post<any>(`${this.apiUrl}/GetAll`, data);
  }

  getCaptins(data: any): Observable<Captin[]> {
    return this.http.post<any>(`${this.apiUrl}/GetPaggedResult`, data);
  }

  getCaptinsGetLite(searchObj: any): Observable<CaptinDtoModel[]> {
    return this.http.post<any>(`${this.apiUrl}/GetLite`, searchObj).pipe(
      map(response => response.data)
    );
  }

  getCaptinsGetAllActiveCaptains(searchObj: any): Observable<CaptinDtoModel[]> {
    return this.http.post<any>(`${this.apiUrl}/GetAllActiveCaptains`, searchObj).pipe(
      map(response => response.data)
    );
  }

  getCaptinById(id: string): Observable<Captin> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getCaptinByUserIdentityId(id: string): Observable<Captin> {
    return this.http.get<any>(`${this.apiUrl}/GetCaptinByApplicationUserId/${id}`);
  }

  createCaptin(captin: Captin): Observable<Captin> {
    return  this.http.post<Captin>(`${this.apiUrl}/add`, captin);
  }

  updateCaptin(captin: Captin): Observable<Captin> {
    return this.http.post<Captin>(`${this.apiUrl}/update`, captin);
  }

  deleteCaptin(obj: DeleteCaptinDtoModel): Observable<DeleteCaptinDtoModel> {
    return this.http.post<DeleteCaptinDtoModel>(`${this.apiUrl}/delete`, obj);
  }
}
