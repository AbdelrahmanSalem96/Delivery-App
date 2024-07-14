import { ActivationStateDtoModel } from './../../Models/ActivationState/ActivationState.Model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Configs } from '../../Core/Utility/Config';

@Injectable({
  providedIn: 'root'
})
export class CaptinActivationStateService {
  private apiUrl = Configs.apiUrl+'/v1/ActivationState';  // Mock API endpoint

  constructor(private http: HttpClient) { }

  getActivationStateLite(searchObj: any): Observable<ActivationStateDtoModel[]> {
    return this.http.post<any>(`${this.apiUrl}/GetLite`, searchObj).pipe(
      map(response => response.data)
    );
  }
}
