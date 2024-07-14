import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { TicketTypeDtoModel } from '../../../../Models/TicketType/TicketType.Model';
import { PaggedResult } from '../../../../Core/SearchControls/PaggedResultInfo/PaggedResult';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TicketModel } from '../../../../Models/Ticket/Ticket.Model';
import { TicketService } from '../../../../Service/Test Service/ticket.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TicketTypeService } from '../../../../Service/Test Service/ticket-type.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrl: './ticket-list.component.css'
})
export class TicketListComponent implements OnInit{
  displayedColumns: string[] = ['ticketDetail', 'ticketType', 'orderCode'];
  tickets = new MatTableDataSource<any>();
  types: TicketTypeDtoModel[] = [];
  orderId!: string ;
  searchObj={};
  totalNumberOfItems = 0;
  pageSize = 8;
  currentPage = 1;

  @Output() ticketCount = new EventEmitter<number>();

  constructor(
    private ticketTypeService:TicketTypeService,
    private ticketService:TicketService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getTicketType();

    let idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
      this.orderId = idParam;
      this.loadTicket();
    } else {
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

  loadTicket(currenttPage: number = 1, pageSize: number = this.pageSize): void {
    const input = {
      searchObj: {
        name: "orderId",
        value: this.orderId,
        type : 0
      }
  ,
      criteria: {
        currentPage: currenttPage,
        pageSize: pageSize,
        expressionCombinationOperator: 1,
      },
    };
    this.ticketService.getTicketsForOneOrder(input.searchObj.value).subscribe((response: any) => {
      this.tickets.data = response.data;
      this.ticketCount.emit( response.data.length );
    });
  }
}
