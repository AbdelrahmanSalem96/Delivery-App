import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Configs } from '../../Core/Utility/Config';
import { OrderStateEnum } from '../../Enum/OrderStete.Enum';

export class Order {
  id?: string;
  orderCode?: string;
  customerName?: string;
  customerMobile?: string;
  customerAddress?: string;
  customerLatitude?: number;
  customerLongitude?: number;
  orderDistanceKM?: number;
  branchId?: string;
  orderLastState?: number;
  createdOn!: Date;
  orderLastUpdatedDate?:Date;
  orderPice?: number;
  deliverPrice?:number;
  createdById?: string;
  lastUpdatedById?:string;
}

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = Configs.apiUrl+"/v1/Order"; // Mock API endpoint
  private ordersSubject = new BehaviorSubject<Order[]>([]);
  public orders$ = this.ordersSubject.asObservable();
  private orders: Order[] = [];
  private apiKey = 'AIzaSyANq7TxOu77OKB4A7p-I8H1dYl8a4-D65g'

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  getOrders(data: any): Observable<Order[]> {
    return this.http.post<any>(`${this.apiUrl}/GetPaggedResult`, data);
  }

  getOrdersPageView(data: any): Observable<Order[]> {
    return this.http.post<any>(`${this.apiUrl}/GetPaggedResultOrderView`, data);
  }

  getOrdersGetLite(searchObj: any): Observable<Order[]> {
    return this.http
      .post<any>(`${this.apiUrl}/GetLite`, searchObj)
      .pipe(map((response) => response.data));
  }

  getOrderById(id: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${id}`);
  }

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}/add`, order);
  }

  getDistance(origin: string, destination: string): Observable<any> {
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${this.apiKey}`;
    return this.http.get(url);
  }

  updateOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}/update`, order);
  }

  assignCaptin(searchObj: any){
    return this.http.post<Order>(`${this.apiUrl}/ManualAssignCaptain`, searchObj);
  }

  getElapsedTime(order: Order): SafeHtml  {
    const now = new Date().getTime();
    const creationTime = new Date(order.createdOn).getTime();
    const elapsed = now - creationTime;

    // const seconds = Math.floor((elapsed / 1000) % 60);
    const minutes = Math.floor((elapsed / (1000 * 60)) % 60);
    const hours = Math.floor((elapsed / (1000 * 60 * 60)) % 24);

    if(order.orderLastState == 117 || order.orderLastState == 90){
      return this.sanitizer.bypassSecurityTrustHtml('<p style="font-size: 11px; font-weight: bold; color:green;">Done</p>');
    }else if(order.orderLastState == 126){
      return this.sanitizer.bypassSecurityTrustHtml('<p style="font-size: 11px; font-weight: bold; color:yellow;">Not Done</p>');
    }else if (elapsed > 2 * 60 * 60 * 1000) {
      return this.sanitizer.bypassSecurityTrustHtml('<p style="font-size: 11px; font-weight: bold; color:red;">Delayed</p>');
    }else{
      // return `${hours}h ${minutes}m`;
      return `${hours-1}h ${minutes}m`;
    }
  }
}
