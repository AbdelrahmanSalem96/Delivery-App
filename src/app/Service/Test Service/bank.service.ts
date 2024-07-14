import { Injectable } from '@angular/core';
import { BankDtoModel } from '../../Models/Bank/Bank.Model';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SearchObj } from '../../Core/SearchControls/Common/SearchObj';
import { Configs } from '../../Core/Utility/Config';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  private apiUrl = Configs.apiUrl+'/v1/Bank';  // Mock API endpoint

  constructor(private http: HttpClient) { }

  getBanks(searchObj: any): Observable<BankDtoModel[]> {
    return this.http.post<BankDtoModel>(`${this.apiUrl}/GetLite`, searchObj).pipe(
      map((response:any )=> response.data)
    );
  }

  getBankById(id: string): Observable<BankDtoModel> {
    return this.http.get<BankDtoModel>(`${this.apiUrl}/${id}`);
  }
}
