import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';


export class OrderLogModel{
  orderDetail?:string;
  orderId?: string;
  orderState?: number;
  createdById?: string;
}

@Injectable({
  providedIn: 'root'
})

export class OrderLogService {
  private apiUrl = 'http://deliveryportal.runasp.net/api/v1/OrderLog';

  private logUrl = 'http://deliveryportal.runasp.net/api/v1/OrderLog/GetAllOrderLogsForOneOrderQuery'

  constructor(private http: HttpClient) { }

  getOrderLogs(searchObj: any): Observable<OrderLogModel[]> {
    return this.http.post<any>(`${this.apiUrl}/GetPaggedResult`, searchObj).pipe(
      map(response => response.data.items)
    );
  }

  getOrderLogsById(id: string): Observable<OrderLogModel> {
    return this.http.get<OrderLogModel>(`${this.apiUrl}/${id}`);
  }

  getOrderLogByOrderId(id: string){
    return this.http.get<any>(`${this.logUrl}/${id}`);
  }

  addLog(searchObj: OrderLogModel): Observable<OrderLogModel>{
    return this.http.post<OrderLogModel>(`${this.apiUrl}/add`, searchObj);
  }
}
