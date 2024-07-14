import { Component } from '@angular/core';
import { TicketService } from '../../../../Service/Test Service/ticket.service';
import { TicketModel } from '../../../../Models/Ticket/Ticket.Model';
import { TicketTypeDtoModel } from '../../../../Models/TicketType/TicketType.Model';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketTypeService } from '../../../../Service/Test Service/ticket-type.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-ticket-add-new',
  templateUrl: './ticket-add-new.component.html',
  styleUrl: './ticket-add-new.component.css'
})
export class TicketAddNewComponent {
  orderId!:string;
  searchObj={};
  types: TicketTypeDtoModel[] = [];

  ticket:TicketModel = {
    ticketTypeId: '',
    ticketDetail:'',
    createdById:''
  }

  constructor(
    private ticketService:TicketService,
    private ticketTypeService:TicketTypeService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private location:Location
  ){}

  ngOnInit(): void {
    this.getTicketType();
    let idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
      this.orderId = idParam;
    } else {
      // Handle the error or navigate away if the id is null
      this.router.navigate(['/notfound']);
      this.snackBar.open('Invalid Order ID', 'Close', { duration: 2000 });
    }
  }

  getTicketType(){
    this.ticketTypeService.getTicketType(this.searchObj).subscribe(
      (types:any) => {
        this.types = types.data; // Directly assign the array
      },
      (error: any) => {
        console.error('Error fetching banks:', error);
      }
    )
  }

  onSubmit(form: NgForm): void {
    this.ticket.orderId = this.orderId;
    this.ticket.createdById = '8c037a32-68d7-4c38-913e-311ce44fa16e';
    if (form.valid && this.orderId !== null) {
      this.ticketService.createTicket(this.ticket).subscribe(() => {
        this.location.back();
        this.snackBar.open('Ticket Added', 'Close', { duration: 2000 });
      });
    }
  }

  onCancel(){
    this.location.back();
  }
}
