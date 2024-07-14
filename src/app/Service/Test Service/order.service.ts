import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

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
  orderCreationDate!: Date;
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
  private apiUrl = 'http://deliveryportal.runasp.net/api/v1/Order'; // Mock API endpoint

  private ordersSubject = new BehaviorSubject<Order[]>([]);
  public orders$ = this.ordersSubject.asObservable();
  private orders: Order[] = [];

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  getOrders(data: any): Observable<Order[]> {
    return this.http.post<any>(`${this.apiUrl}/GetPaggedResult`, data);
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

  updateOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}/update`, order);
  }

  assignCaptin(searchObj: any){
    return this.http.post<Order>(`${this.apiUrl}/ManualAssignCaptain`, searchObj);
  }

  getElapsedTime(order: Order): SafeHtml  {
    const now = new Date().getTime();
    const creationTime = new Date(order.orderCreationDate).getTime();
    const elapsed = now - creationTime;

    // const seconds = Math.floor((elapsed / 1000) % 60);
    const minutes = Math.floor((elapsed / (1000 * 60)) % 60);
    const hours = Math.floor((elapsed / (1000 * 60 * 60)) % 24);

    if (elapsed > 2 * 60 * 60 * 1000) {
      return this.sanitizer.bypassSecurityTrustHtml('<p style="font-size: 11px; font-weight: bold; color:red;">Delayed</p>');
    }else{
      // return `${hours}h ${minutes}m`;
      return `${hours-1}h ${minutes}m`;
    }
  }
}
