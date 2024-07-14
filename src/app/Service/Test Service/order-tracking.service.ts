import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Configs } from '../../Core/Utility/Config';

@Injectable({
  providedIn: 'root'
})
export class OrderTrackingService {

  private apiUrl = Configs.apiUrl+'/v1/OrderTracking';

  constructor(private http: HttpClient) { }

  getOrderTrackingByOrderId(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/GetAllOrderTrackingsForOneOrder/${id}`);
  }
}
