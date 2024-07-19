import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Order, OrderService } from '../../../Service/Test Service/order.service';
import { ClientBranchService } from '../../../Service/Test Service/client-branch.service';
import { ClientBranchModel } from '../../../Models/Client Branch/ClientBranch.Model';
import { MapDirectionsService} from '@angular/google-maps';
import { Observable, map, of } from 'rxjs';
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
  markerPosition:any = {lat: 30.5503169342002 ,lng: 31.02324393801057};
  // title = 'my-google-maps-project';
  // center = { lat: 30.04457558410753, lng: 31.235073174639126 };
  // zoom = 10;

  // markers = [
    //   { position: { lat: this.branchLocationLatitude, lng: this.branchLocationLongitude }, label: 'Branch' },
  //   { position: { lat: this.customerLatitude, lng: this.customerLongitude }, label: 'Customer' },
  // ];

  // markers: Array<{ position: { lat: number, lng: number }, label: string }> = [];

  markers: any[] = [];
  orderLastLocation:any;

  mapCenter!: google.maps.LatLngLiteral;
  mapZoom: number = 13;
  directionsResults$!: Observable<google.maps.DirectionsResult | null>;

  originPosition!: google.maps.LatLngLiteral;
  destinationPosition!: google.maps.LatLngLiteral;
  orderPosition!: google.maps.LatLng;
  originLabel = { text: 'Customer Location', color: 'white' };
  destinationLabel = { text: 'Branch Location', color: 'white' };
  orderLabel = { text: 'Order Location', color: 'white' };
  originIcon = { url: 'path_to_customer_icon.png', scaledSize: new google.maps.Size(30, 30) };
  destinationIcon = { url: 'path_to_branch_icon.png', scaledSize: new google.maps.Size(30, 30) };
  orderIcon = { url: '../../../../assets/images/delivery.gif', scaledSize: new google.maps.Size(30, 30) };


  constructor(
    private orderService: OrderService,
    private clientBranchService:ClientBranchService,
    private orderTrackingService:OrderTrackingService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private mapDirectionsService: MapDirectionsService
  ){

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

  getDirections(){
    const request: google.maps.DirectionsRequest = {
      destination: {lat: this.branchLocationLatitude, lng: this.branchLocationLongitude},
      origin: {lat: this.customerLatitude, lng: this.customerLongitude},
      travelMode: google.maps.TravelMode.DRIVING
    };
    // this.directionsResults$ = this.mapDirectionsService.route(request).pipe(map(response => response.result));
    this.calculateRoute(request);
  }

  calculateRoute(request: google.maps.DirectionsRequest) {
    const directionsService = new google.maps.DirectionsService();

    directionsService.route(request, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.directionsResults$ = of(result);
      } else {
        this.directionsResults$ = of(null);
        console.error(`Directions request failed due to ${status}`);
      }
    });
  }

  getOrderDetails(orderId: string): void {
    this.orderService.getOrderById(orderId).subscribe(
      (order: any) => {
        // get order by id then pass customer lat & long
        this.order = order.data;
        this.customerLatitude = order.data.customerLatitude;
        this.customerLongitude = order.data.customerLongitude;
        this.updateMarkers();
        this.getDirections();

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
        this.getDirections();
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
        this.orderPosition = new google.maps.LatLng(this.orderLastLatitude,this.orderLastLongitude);
        this.updateMarkers();
      }
    )
  }

  updateMarkers() {
    if (this.branchLocationLatitude && this.branchLocationLongitude &&
        this.customerLatitude && this.customerLongitude &&
        this.orderLastLatitude &&  this.orderLastLongitude) {
          this.mapCenter = {
            lat: (this.branchLocationLatitude + this.customerLatitude + this.orderLastLatitude) / 3,
            lng: (this.branchLocationLongitude + this.customerLongitude + this.orderLastLongitude) / 3
          };
    }
  }


}
