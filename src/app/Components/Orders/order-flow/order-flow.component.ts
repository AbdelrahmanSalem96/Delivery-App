import { Captin } from './../../../Service/Test Service/captin.service';
import { Component, TemplateRef, ViewChild, AfterViewInit } from '@angular/core';
import { TabsValueEnum } from '../../../Enum/Tabs.Enum';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Order, OrderService } from '../../../Service/Test Service/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CaptinService } from '../../../Service/Test Service/captin.service';
import { NgForm } from '@angular/forms';
import { OrderStateEnum } from '../../../Enum/OrderStete.Enum';
import { OrderLogModel, OrderLogService } from '../../../Service/Test Service/order-log.service';

export class Assign{
  id?:string;
  captinId!:string;
  lastUpdatedById!:string;
}

export interface State{
  label: string;
  value: number;
}

@Component({
  selector: 'app-order-flow',
  templateUrl: './order-flow.component.html',
  styleUrl: './order-flow.component.css'
})
export class OrderFlowComponent {
  ticketNumbers:number=0;
  captinName!:string;
  captinMobile!:string;
  captinId!:string;
  captins!:any[];
  order:Order = new Order;
  orderId!:string;
  orderLogs!:any[];
  assignForm: Assign ={
    id:"",
    captinId:"",
    lastUpdatedById:"8c037a32-68d7-4c38-913e-311ce44fa16e"
  };
  orderStates: State[] = [];
  serchObj:OrderLogModel={};
  dialogRef: MatDialogRef<any> | undefined;

  @ViewChild('captinDialog') captinDialog!: TemplateRef<any>;
  @ViewChild('assignDialog') assignDialog!: TemplateRef<any>;
  @ViewChild('stateDialog') stateDialog!: TemplateRef<any>;

  constructor(
    private dialog: MatDialog,
    private orderService: OrderService,
    private orderLog: OrderLogService,
    private captinService:CaptinService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
  ){}

  ngOnInit(): void {
    this.orderStates = this.getOrderStates();
    let idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
      this.orderId = idParam;
      this.assignForm.id = idParam;
      this.getOrderDetails(this.orderId);
    } else {
      this.router.navigate(['/notfound']);
      this.snackBar.open('Invalid Order ID', 'Close', { duration: 2000 });
    }
    this.getAllCaptins();
  }

  AfterViewInit(){
    // this.handleTicketCount();
  }

  ngAfterContentChecked(): void {
    //Called after every check of the component's or directive's content.
    //Add 'implements AfterContentChecked' to the class.
  }

  getOrderDetails(orderId: string): void {
    this.orderService.getOrderById(orderId).subscribe(
      (order: any) => {
        this.order = order.data;
        this.captinId = order.data.captinId;
        this.getCaptinDetails(order.data.captinId);
      },
      (error: any) => {
        console.error('Error Fetching Order:', error);
        this.snackBar.open('Error Fetching Order', 'Close', { duration: 2000 });
      }
    );
  }

  getCaptinDetails(captinId: string): void {
    this.captinService.getCaptinByUserIdentityId(captinId).subscribe(
      (data: any) => {
        this.captinName = data.data.name;
        this.captinMobile = data.data.phoneNumber;
      },
      (error: any) => {
        console.error('Error fetching captin:', error);
        this.snackBar.open('Error fetching captin', 'Close', { duration: 2000 });
      }
    );
  }

  getAllCaptins(){
    this.captinService.getAllCaptins(this.serchObj).subscribe((response:any) => {
      this.captins = response.data;
    })
  }

  getOrderStates() {
    return Object.keys(OrderStateEnum)
      .filter(key => isNaN(Number(key)))
      .map(key => {
        const enumKey = key as keyof typeof OrderStateEnum;
        return { label: key, value: OrderStateEnum[enumKey] };
      });
  }

  handleTicketCount(length: number) {
    this.ticketNumbers = length
  }

  updateOrderState(){
    this.dialogRef = this.dialog.open(this.stateDialog);
  }

  captinInfo(){
    this.dialogRef = this.dialog.open(this.captinDialog);
  }

  assignCaptin(){
    this.dialogRef = this.dialog.open(this.assignDialog);
  }

  onDialogNoClick(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  onSubmitState(form: NgForm): void{
    this.serchObj.createdById = "8c037a32-68d7-4c38-913e-311ce44fa16e";
    this.serchObj.orderId = this.orderId;
    this.serchObj.orderState = form.value.orderLastState;
    debugger;
    this.orderLog.addLog( this.serchObj).subscribe((data) => {
      this.getOrderLogByOrderId(this.orderId);
      this.onDialogNoClick();
      this.snackBar.open('Order State updated', 'Close', { duration: 2000 });
    })
  }

  getOrderLogByOrderId(orderId: string){
    this.orderLog.getOrderLogByOrderId(orderId).subscribe(
      data => {
        this.orderLogs = data.data;
      },
      (error: any) => {
        console.error('Error Fetching Order:', error);
        this.snackBar.open('Error Fetching Order', 'Close', { duration: 2000 });
      });
  }

  onSubmit(form: NgForm): void {
    this.assignForm.captinId = form.value.captinId;
    if (form.valid) {
      this.orderService.assignCaptin(this.assignForm).subscribe((res) => {
        this.onDialogNoClick();
        this.snackBar.open('Captin Assigned Successfully', 'Close', { duration: 2000 });
      });
    }
  }
}
