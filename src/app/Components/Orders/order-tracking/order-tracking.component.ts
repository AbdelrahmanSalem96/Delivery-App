import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Order, OrderService } from '../../../Service/Test Service/order.service';
import { ClientBranchService } from '../../../Service/Test Service/client-branch.service';
import { ClientBranchModel } from '../../../Models/Client Branch/ClientBranch.Model';
import { MapDirectionsService} from '@angular/google-maps';
import { Observable, map } from 'rxjs';
import { OrderTrackingService } from '../../../Service/Test Service/order-tracking.service';


@Component({
  selector: 'app-order-tracking',
  templateUrl: './order-tracking.component.html',
  styleUrl: './order-tracking.component.css'
})

export class OrderTrackingComponent {
  orderId!:string;
  order!: Order;
  branchId!:string;
  branch!: ClientBranchModel;
  customerLatitude!:number;
  customerLongitude!:number;
  branchLocationLatitude!:number;
  branchLocationLongitude!:number;
  orderLastLatitude!:number;
  orderLastLongitude!:number;

  title = 'my-google-maps-project';
  center = { lat: 30.04457558410753, lng: 31.235073174639126 };
  zoom = 10;
  // readonly directionsResults$: Observable<google.maps.DirectionsResult|undefined>;

  // markers = [
  //   { position: { lat: this.branchLocationLatitude, lng: this.branchLocationLongitude }, label: 'Branch' },
  //   { position: { lat: this.customerLatitude, lng: this.customerLongitude }, label: 'Customer' },
  // ];

  // markers: Array<{ position: { lat: number, lng: number }, label: string }> = [];

  markers: any[] = [];
  orderLastLocation:any;

  mapCenter!: google.maps.LatLngLiteral;
  mapZoom: number = 13;

  constructor(
    private orderService: OrderService,
    private clientBranchService:ClientBranchService,
    private orderTrackingService:OrderTrackingService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    mapDirectionsService: MapDirectionsService
  ){
    // const request: google.maps.DirectionsRequest = {
    //   destination: {lat: 12, lng: 4},
    //   origin: {lat: 14, lng: 8},
    //   travelMode: google.maps.TravelMode.DRIVING
    // };
    // this.directionsResults$ = mapDirectionsService.route(request).pipe(map(response => response.result));
  }


  ngOnInit(): void {

    let idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
      this.orderId = idParam;
      this.getOrderDetails(this.orderId);
      this.getOrderTracking(this.orderId)
    } else {
      this.router.navigate(['/notfound']);
      this.snackBar.open('Invalid Order ID', 'Close', { duration: 2000 });
    }
  }


  getOrderDetails(orderId: string): void {
    this.orderService.getOrderById(orderId).subscribe(
      (order: any) => {
        // get order by id then pass customer lat & long
        this.order = order.data;
        this.customerLatitude = order.data.customerLatitude;
        this.customerLongitude = order.data.customerLongitude;
        this.updateMarkers();
        // get branch by id
        this.branchId = order.data.branchId;
        this.getClientBranchDetails(this.branchId)
      },
      (error: any) => {
        console.error('Error Fetching Order:', error);
        this.snackBar.open('Error Fetching Order', 'Close', { duration: 2000 });
      }
    );
  }

  getClientBranchDetails(branchId: string): void {
    this.clientBranchService.getClientBranchByAppUserId(branchId).subscribe(
      (branch: any) => {
        this.branch = branch.data;
        this.branchLocationLatitude = branch.data.branchLocationLatitude;
        this.branchLocationLongitude = branch.data.branchLocationLongitude;
        this.updateMarkers();
      },
      (error: any) => {
        console.error('Error Fetching Branch:', error);
        this.snackBar.open('Error Fetching Branch', 'Close', { duration: 2000 });
      }
    );
  }

  getOrderTracking(orderId: string): void{
    this.orderTrackingService.getOrderTrackingByOrderId(orderId).subscribe(
      (orderLocation:any) => {
        this.orderLastLocation = orderLocation.data[orderLocation.data.length - 1];
        this.orderLastLatitude = this.orderLastLocation.locationLatitude;
        this.orderLastLongitude = this.orderLastLocation.locationLongitude;
        this.updateMarkers();
      }
    )
  }

  updateMarkers() {
    if (this.branchLocationLatitude && this.branchLocationLongitude &&
        this.customerLatitude && this.customerLongitude &&
        this.orderLastLatitude &&  this.orderLastLongitude) {
          this.markers = [
            { position: { lat: this.branchLocationLatitude, lng: this.branchLocationLongitude }, label: 'Branch' },
            { position: { lat: this.customerLatitude, lng: this.customerLongitude }, label: 'Customer' },
            { position: { lat: this.orderLastLatitude, lng: this.orderLastLongitude }, label: 'Order' },
          ];

          this.mapCenter = {
            lat: (this.branchLocationLatitude + this.customerLatitude + this.orderLastLatitude) / 3,
            lng: (this.branchLocationLongitude + this.customerLongitude + this.orderLastLongitude) / 3
          };
    }
  }


}
