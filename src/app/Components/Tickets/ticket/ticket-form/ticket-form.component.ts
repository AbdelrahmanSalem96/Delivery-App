import { Component, OnInit } from '@angular/core';
import { TicketModel } from '../../../../Models/Ticket/Ticket.Model';

@Component({
  selector: 'app-ticket-form',
  templateUrl: './ticket-form.component.html',
  styleUrl: './ticket-form.component.css'
})
export class TicketFormComponent implements OnInit{
  ticket!:TicketModel;
  ticketType = [{id:"1", name:"type 1"},{id:"2", name:"type 2"},{id:"3", name:"type 3"}];
  ngOnInit(): void {
    // this.ticket.ticketType = [{id:"1", name:"type 1"},{id:"2", name:"type 2"},{id:"3", name:"type 3"}]
  }
}
