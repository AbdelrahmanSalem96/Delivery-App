import { Component, OnInit } from '@angular/core';
import { CaptinService } from '../../../Service/Test Service/captin.service';

@Component({
  selector: 'app-captin-tracking',
  templateUrl: './captin-tracking.component.html',
  styleUrl: './captin-tracking.component.css'
})
export class CaptinTrackingComponent implements OnInit{
  apiKey ="AIzaSyBwyTUXlFDc-4GWIKBFsBcxWDOvcEyb_Y4";
  googleMapsApiKey !:string;
  serchObj = {};

  map: any;
  markers: any[] = [];
  mapOptions: google.maps.MapOptions = {
    center: { lat: 30.04457558410753, lng: 31.235073174639126 },
    zoom: 13,
  };

  constructor(private captinService:CaptinService){}

  ngOnInit(): void {
    this.googleMapsApiKey = this.apiKey;
    this.getAllActiveCaptains();
    const beachFlag = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
    this.markers.forEach((location) => {
      let imgTag = document.createElement("img");
      imgTag.src = beachFlag;
      location.content = imgTag;
    });
  }


  getAllActiveCaptains(){
    this.captinService.getCaptinsGetAllActiveCaptains(this.serchObj).subscribe(response => {
      this.markers = response;
    })
  }
}
