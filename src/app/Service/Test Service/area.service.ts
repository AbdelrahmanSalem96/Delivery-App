import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AreaDtoModel } from '../../Models/Area/Area.Model';
import { SearchObj } from '../../Core/SearchControls/Common/SearchObj';
import { InitialConstants } from '../../Core/Constant/InitialConstant';
import { Configs } from '../../Core/Utility/Config';

export class Area{
  id:string= InitialConstants.DefaultString;
  name:string= InitialConstants.DefaultString;
}

@Injectable({
  providedIn: 'root'
})

export class AreaService {
  private apiUrl = Configs.apiUrl+'/v1/Area';  // Mock API endpoint

  constructor(private http: HttpClient) { }

  getAreas(searchObj: any): Observable<AreaDtoModel[]> {
    return this.http.post<AreaDtoModel>(`${this.apiUrl}/GetLite`,  searchObj ).pipe(
      map((response:any )=> response.data)
    );
  }

  getAreasByParentId(id:string){
    return this.http.get<Area>(`${this.apiUrl}/GetLiteByParentId/${id}`);
  }

  getAreaByAreaType(AreaType:number){
    return this.http.get<Area>(`${this.apiUrl}/GetAreaByAreaType/${AreaType}`);
  }
}
