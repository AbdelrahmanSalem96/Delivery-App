import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Order, OrderService } from '../../../../Service/Test Service/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClientBranchModel } from '../../../../Models/Client Branch/ClientBranch.Model';
import { ClientBranchService } from '../../../../Service/Test Service/client-branch.service';
import { SearchObj } from '../../../../Core/SearchControls/Common/SearchObj';

@Component({
  selector: 'app-order-update',
  templateUrl: './order-update.component.html',
  styleUrl: './order-update.component.css'
})
export class OrderUpdateComponent implements OnInit {
  orderId!:string;
  branches: ClientBranchModel[] = [];
  searchObj!:SearchObj

  order!: Order;

  constructor
  (private orderService: OrderService,
    private clientBranchService: ClientBranchService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.getBranches();

    let idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
      this.orderId = idParam;
      this.getOrderDetails(this.orderId);
    } else {
      // Handle the error or navigate away if the id is null
      this.router.navigate(['/notfound']);
      this.snackBar.open('Invalid Order ID', 'Close', { duration: 2000 });
    }
  }

  getBranches(){
    this.clientBranchService.getClientBranches(this.searchObj).subscribe(
      (branches: ClientBranchModel[]) => {
        this.branches = branches; // Directly assign the array
      },
      (error: any) => {
        console.error('Error fetching branches:', error);
      }
    );
  }

  getOrderDetails(orderId: string): void {
    this.orderService.getOrderById(orderId).subscribe(
      (order: Order) => {
        this.order = order;
      },
      (error: any) => {
        console.error('Error Fetching Order:', error);
        this.snackBar.open('Error Fetching Order', 'Close', { duration: 2000 });
      }
    );
  }

  onSubmit(form: NgForm): void {
    if (form.valid && this.orderId !== null) {
      // this.orderService.updateOrder(this.orderId, form.value).subscribe(() => {
      //   this.router.navigate(['/order']);
      //   this.snackBar.open('Order updated', 'Close', { duration: 2000 });
      // });
    }
  }

  onCancel(){
    this.router.navigate(['/order']);
  }
}
