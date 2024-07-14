import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TicketModel } from '../../Models/Ticket/Ticket.Model';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private apiUrl = 'http://deliveryportal.runasp.net/api/v1/Ticket';  // Mock API endpoint

  constructor(private http: HttpClient) { }

  getTickets(data: any): Observable<TicketModel[]> {
    return this.http.post<any>(`${this.apiUrl}/GetPaggedResult`, data);
  }

  getTicketsForOneOrder(id: string): Observable<TicketModel[]> {
    return this.http.get<any>(`${this.apiUrl}/GetAllTicketsForOneOrderQuery/${id}`);
  }

  getTicketById(id: string): Observable<TicketModel> {
    return this.http.get<TicketModel>(`${this.apiUrl}/${id}`);
  }

  createTicket(ticket: TicketModel): Observable<TicketModel> {
    return  this.http.post<TicketModel>(`${this.apiUrl}/Add`, ticket);
  }
}
