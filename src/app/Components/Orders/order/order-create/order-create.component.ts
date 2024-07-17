import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Order, OrderService } from '../../../../Service/Test Service/order.service';
import { ClientBranchService } from '../../../../Service/Test Service/client-branch.service';
import { ClientBranchModel, LightBranchModel } from '../../../../Models/Client Branch/ClientBranch.Model';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { SearchObj } from '../../../../Core/SearchControls/Common/SearchObj';
import { ClientService } from '../../../../Service/Test Service/client.service';
import { ClientModel, getLightClientModel } from '../../../../Models/Client/Client.Model';
import { AuthService } from '../../../../Service/Test Service/auth.service';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrl: './order-create.component.css'
})
export class OrderCreateComponent implements OnInit{

  loadCreateId = "loadCreateId";
  public timer: number = 0;
  private intervalId: any;
  branches!: any[];
  clients: any[] = [];
  // client!:ClientModel;
  selectedClient: string = '';
  searchObj={};
  location: string ="";
  userId!: any;
  userRole!: any;
  showClients:boolean = true

  order: Order = {
    branchId:'',
    createdOn: new Date(),
    orderLastState: 9,
    createdById : ''
  };

  constructor(
    private orderService: OrderService,
    private clientService: ClientService,
    private clientBranchService: ClientBranchService,
    private authService:AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.userRole = this.authService.getRole();
    if(this.userRole === 'ClientBranch'){
      this.showClients = false;
    } else if(this.userRole === "Client") {
      this.showClients = true;
      this.getClientByAppUserId(this.userId);
    }else{
      this.showClients = true;
      this.getClients();
    }
  }

  getClients(){
    this.clientService.getClientsGetLite(this.searchObj).subscribe((response:any) => {
      this.clients = response;
    })
  }

  getClientByAppUserId(userId:string){
    this.clientService.getClientsByApplicationUserId(userId).subscribe((response:any) => {
      this.clients.push(response.data);
    })
  }

  onClientChange(){
    let input:any;
    if(this.userRole === "Client") {
      input = {
          "clientId":this.userId
      };
    }else{
      input = {
        "clientId":this.selectedClient
      };
    }
    this.clientBranchService.getBranchesGetLite(input).subscribe((response: any) => {
      console.log(response.data == null);
      if(response.data == null || response.data.length === 0){
        this.snackBar.open('No Branches Found For this Client', 'Close', { duration: 20000, panelClass: ['custom-snackbar'] });
        this.selectedClient = ''
      }else {
        this.branches = response.data;
      }
    });
  }

  splitLocation(location: string): { latitude: number, longitude: number } {
    const [latitude, longitude] = location.split(',').map(coord => parseFloat(coord.trim()));
    return { latitude, longitude };
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      const { latitude, longitude } = this.splitLocation(this.location);
      this.order.customerLatitude = latitude;
      this.order.customerLongitude = longitude;
      this.order.createdById = this.userId;
      this.orderService.createOrder(this.order).subscribe(() => {
        this.router.navigate(['/order']);
        this.snackBar.open('Order created', 'Close', { duration: 2000 });
      });
    }
  }

  startTimer() {
    this.intervalId = setInterval(() => {}, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  onCancel() {
    this.router.navigate(['/order']);
  }
}
