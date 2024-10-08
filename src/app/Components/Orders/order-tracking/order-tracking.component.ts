import { Component, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Order,
  OrderService,
} from '../../../Service/Test Service/order.service';
import { ClientBranchService } from '../../../Service/Test Service/client-branch.service';
import { ClientBranchModel } from '../../../Models/Client Branch/ClientBranch.Model';
import { MapDirectionsService, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Observable, map, of } from 'rxjs';
import { OrderTrackingService } from '../../../Service/Test Service/order-tracking.service';
import { CaptinService } from '../../../Service/Test Service/captin.service';

@Component({
  selector: 'app-order-tracking',
  templateUrl: './order-tracking.component.html',
  styleUrl: './order-tracking.component.css',
})
export class OrderTrackingComponent {
  orderId!: string;
  order!: Order;
  branchId!: string;
  branch!: ClientBranchModel;
  customerLatitude!: number;
  customerLongitude!: number;
  branchLocationLatitude!: number;
  branchLocationLongitude!: number;
  orderLastLatitude!: number;
  orderLastLongitude!: number;

  markers: any[] = [];
  orderLastLocation: any;
  serchObj = {};

  mapCenter!: google.maps.LatLngLiteral;
  mapZoom: number = 13;
  directionsResults$!: Observable<google.maps.DirectionsResult | null>;
  distance: string = '';
  @ViewChild(MapInfoWindow, { static: false }) infoWindow?: MapInfoWindow;

  originPosition!: google.maps.LatLngLiteral;
  destinationPosition!: google.maps.LatLngLiteral;
  orderPosition!: google.maps.LatLng;
  originLabel = { text: 'Customer Location', color: 'white' };
  destinationLabel = { text: 'Branch Location', color: 'white' };
  orderLabel = { text: 'Order Location', color: 'blue' };


  constructor(
    private orderService: OrderService,
    private clientBranchService: ClientBranchService,
    private orderTrackingService: OrderTrackingService,
    private captinService:CaptinService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private mapDirectionsService: MapDirectionsService
  ) {}

  ngOnInit(): void {
    this.getAllActiveCaptains();
    let idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
      this.orderId = idParam;
      this.getOrderDetails(this.orderId);
      this.getOrderTracking(this.orderId);
    } else {
      this.router.navigate(['/notfound']);
      this.snackBar.open('Invalid Order ID', 'Close', { duration: 2000 });
    }
  }

  openInfoWindow(marker: MapMarker) {
    if (this.infoWindow != undefined) this.infoWindow.open(marker);
  }

  getDirections() {
    const request: google.maps.DirectionsRequest = {
      destination: {
        lat: this.branchLocationLatitude,
        lng: this.branchLocationLongitude,
      },
      origin: { lat: this.customerLatitude, lng: this.customerLongitude },
      travelMode: google.maps.TravelMode.DRIVING,
    };
    // this.directionsResults$ = this.mapDirectionsService.route(request).pipe(map(response => response.result));
    this.calculateRoute(request);
  }

  calculateRoute(request: google.maps.DirectionsRequest) {
    const directionsService = new google.maps.DirectionsService();

    directionsService.route(request, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK && result) {
        this.directionsResults$ = of(result);

        // Extract the distance from the result
        if (result.routes.length > 0) {
          const route = result.routes[0];
          if (route.legs.length > 0) {
            const leg = route.legs[0];
            this.distance = leg.distance?.text || 'N/A';
          }
        }
      } else {
        this.directionsResults$ = of(null); // Use null instead of undefined
        this.distance = 'N/A'; // Set distance to N/A on failure
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
        this.getClientBranchDetails(this.branchId);
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
        this.snackBar.open('Error Fetching Branch', 'Close', {
          duration: 2000,
        });
      }
    );
  }

  getOrderTracking(orderId: string): void {
    this.orderTrackingService
      .getOrderTrackingByOrderId(orderId)
      .subscribe((orderLocation: any) => {
        this.orderLastLocation =
          orderLocation.data[orderLocation.data.length - 1];
        this.orderLastLatitude = this.orderLastLocation.locationLatitude;
        this.orderLastLongitude = this.orderLastLocation.locationLongitude;
        this.orderPosition = new google.maps.LatLng(
          this.orderLastLatitude,
          this.orderLastLongitude
        );
        this.updateMarkers();
      });
  }

  refreshOrderTracking(){
    this.getOrderTracking(this.orderId);
  }

  getAllActiveCaptains(){
    this.captinService.getCaptinsGetAllActiveCaptains(this.serchObj).subscribe(response => {
      this.markers = response;
    })
  }

  updateMarkers() {
    if (
      this.branchLocationLatitude &&
      this.branchLocationLongitude &&
      this.customerLatitude &&
      this.customerLongitude &&
      this.orderLastLatitude &&
      this.orderLastLongitude
    ) {
      this.mapCenter = {
        lat:
          (this.branchLocationLatitude +
            this.customerLatitude +
            this.orderLastLatitude) /
          3,
        lng:
          (this.branchLocationLongitude +
            this.customerLongitude +
            this.orderLastLongitude) /
          3,
      };
    }
  }

}
