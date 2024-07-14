import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderTrackingService {

  private apiUrl = 'http://deliveryportal.runasp.net/api/v1/OrderTracking';

  constructor(private http: HttpClient) { }

  getOrderTrackingByOrderId(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/GetAllOrderTrackingsForOneOrder/${id}`);
  }
}
