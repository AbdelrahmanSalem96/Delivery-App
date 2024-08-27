import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OrderLogService, OrderLogModel } from '../../../Service/Test Service/order-log.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderStateEnum } from '../../../Enum/OrderStete.Enum';

@Component({
  selector: 'app-order-logs',
  templateUrl: './order-logs.component.html',
  styleUrl: './order-logs.component.css'
})
export class OrderLogsComponent implements OnInit, AfterViewInit{
  displayedColumns: string[] = ['createdByName', 'createdOn', 'orderState'];
  orderId!: string ;
  orderLogs = new MatTableDataSource<any>();
  orderLogs2!:any[];
  orderLastStates = this.getOrderStates();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('confirmDialog') confirmDialog!: TemplateRef<any>;

  constructor(
    private orderLogService: OrderLogService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
      this.orderId = idParam;
      this.getOrderLogByOrderId(this.orderId);
    } else {
      this.router.navigate(['/notfound']);
      this.snackBar.open('Invalid Order ID', 'Close', { duration: 2000 });
    }
  }

  ngAfterViewInit():void {
    this.orderLogs.sort = this.sort;
  }

  getStateLabel(stateValue: number): string {
    const state = this.orderLastStates.find(s => s.value === stateValue);
    return state ? state.label : 'Unknown State';
  }

  getOrderStates() {
    return Object.keys(OrderStateEnum)
      .filter(key => isNaN(Number(key)))
      .map(key => {
        const enumKey = key as keyof typeof OrderStateEnum;
        const formattedLabel = key.replace(/([a-z])([A-Z])/g, '$1 $2');
        return { label: formattedLabel, value: OrderStateEnum[enumKey] };
      });
  }

  getOrderLogByOrderId(orderId: string){
    this.orderLogService.getOrderLogByOrderId(orderId).subscribe(
      data => {
        this.orderLogs2 = data.data;
      },
      (error: any) => {
        console.error('Error Fetching Order:', error);
        this.snackBar.open('Error Fetching Order', 'Close', { duration: 2000 });
      });
  }


  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.orderLogs.filter = filterValue.trim().toLowerCase();
    if (this.orderLogs.paginator) {
      this.orderLogs.paginator.firstPage();
    }
  }

}
