import { Component, OnInit } from '@angular/core';
import { AreaService } from '../../../../Service/Test Service/area.service';
import { AreaDtoModel } from '../../../../Models/Area/Area.Model';
import { Vehicle, VehicleService } from '../../../../Service/Test Service/vehicle.service';
import { VehicleTypeService } from '../../../../Service/Test Service/vehicle-type.service';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { VehicleTypeDtoModel } from '../../../../Models/VehicleType/VehicleType.Model';
import { VehicleOwnerEnum } from '../../../../Enum/VehicleOwner.Enum';
import { VehicleStateService } from '../../../../Service/Test Service/vehicle-state.service';
import { VehicleStateDtoModel } from '../../../../Models/VehicleState/VehicleState.Model';
import { VehicleOwnerService } from '../../../../Service/Test Service/vehicle-owner.service';
import { VehicleOwnerLiteModel } from '../../../../Models/VehicleOwner/VehicleOwner.Model';
import { CaptinService } from '../../../../Service/Test Service/captin.service';
import { CaptinDtoModel } from '../../../../Models/Captin/Captin.Model';
import { AuthService } from '../../../../Service/Test Service/auth.service';

export interface State{
  label: string;
  value: number;
}

@Component({
  selector: 'app-vehicle-create',
  templateUrl: './vehicle-create.component.html',
  styleUrl: './vehicle-create.component.css'
})
export class VehicleCreateComponent implements OnInit{
  searchObj={};
  WorkingRejoins:AreaDtoModel [] = [];
  regionType = 6;
  vehicleStates:VehicleStateDtoModel[]=[];
  vehicleTypes:VehicleTypeDtoModel[]=[];
  vehicleOwnerTypes:State[]=[];
  vehicleOwners:VehicleOwnerLiteModel[]=[];
  captains:CaptinDtoModel[]=[];
  userId!: any;

  vehicle:Vehicle = {
    name: '' ,
    brand: '' ,
    number: '' ,
    rcBookExpiryDate: '' ,
    rcBookExpiryDateImage: '' ,
    rcBookExpiryDateImagePath: '' ,
    insuranceExpiryDate: '' ,
    insuranceExpiryDateImage: '' ,
    insuranceExpiryDateImagePath: '' ,
    currantRunningKM: 0,
    areaId: '' ,
    vehicleTypeId: '' ,
    vehicleOwnerType: 0,
    vehicleStateId: '' ,
    applicationOwnerIdentityUserId: '' ,
    createdById: '' ,
  }

  constructor(
    private areaService :AreaService,
    private vehicleService:VehicleService,
    private vehicleTypeService:VehicleTypeService,
    private vehicleStateService:VehicleStateService,
    private vehicleOwnerService:VehicleOwnerService,
    private captinService:CaptinService,
    private authService:AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
  ){}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.getAreaByType(this.regionType);
    this.getVehicleState();
    this.getVehicleTypes();
    this.getVehicleOwner();
    this.getCaptains();
    this.vehicleOwnerTypes = this.geVehicleOwnerType();
  }

  getAreaByType(type:number){
    this.areaService.getAreaByAreaType(type).subscribe( (res:any)=>{
      this.WorkingRejoins = res.data;
    },
    (error: any) => {
        console.error('Error fetching areas:', error);
      }
    );
  }

  getVehicleTypes(){
    this.vehicleTypeService.getVehicleTypes(this.searchObj).subscribe(
      (vehicleTypes: VehicleTypeDtoModel[]) => {
        this.vehicleTypes = vehicleTypes;
      },
      (error: any) => {
        console.error('Error fetching vehicle Types:', error);
      }
    );
  }

  geVehicleOwnerType() {
    return Object.keys(VehicleOwnerEnum)
      .filter(key => isNaN(Number(key)))
      .map(key => {
        const enumKey = key as keyof typeof VehicleOwnerEnum;
        return { label: key, value: VehicleOwnerEnum[enumKey] };
      });
  }

  getVehicleOwner(){
    this.vehicleOwnerService.getVehicleOwnerLite(this.searchObj).subscribe(
      (owners: VehicleOwnerLiteModel[]) => {
        this.vehicleOwners = owners; // Directly assign the array
      },
      (error: any) => {
        console.error('Error fetching areas:', error);
      }
    );
  }

  getVehicleState(){
    this.vehicleStateService.getVehicleStateLite(this.searchObj).subscribe(
      (states: VehicleStateDtoModel[]) => {
        this.vehicleStates = states; // Directly assign the array
      },
      (error: any) => {
        console.error('Error fetching areas:', error);
      }
    );
  }

  getCaptains(){
    this.captinService.getCaptinsGetLite(this.searchObj).subscribe(
      (captains: CaptinDtoModel[]) => {
        this.captains = captains; // Directly assign the array
      },
      (error: any) => {
        console.error('Error fetching areas:', error);
      }
    );
  }

  processBase64Image(base64img: string): string {
    const prefixes = [
      "data:image/png;base64,",
      "data:image/jpeg;base64,",
      "data:image/jpg;base64,"
    ];

    for (const prefix of prefixes) {
      if (base64img.startsWith(prefix)) {
        return base64img.slice(prefix.length);
      }
    }

    throw new Error("Invalid base64 image string");
  }

  onFileChange(event: any, imageType: string) {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {

          const base64Image = reader.result as string;
          const processedImg = this.processBase64Image(base64Image);

          if (imageType === 'rcBookExpiryDateImage') {
            this.vehicle.rcBookExpiryDateImage = processedImg;
            this.vehicle.rcBookExpiryDateImagePath = file.name;
          } else if (imageType === 'insuranceExpiryDateImage') {
            this.vehicle.insuranceExpiryDateImage = processedImg;
            this.vehicle.insuranceExpiryDateImagePath = file.name;
          }
        };
      }
    }
  }

  onSubmit(form: NgForm): void {
    this.vehicle.createdById = this.userId;
    if (form.valid) {
      this.vehicleService.createVehicle(this.vehicle).subscribe(() => {
        this.router.navigate(['/vehicle']);
        this.snackBar.open('Vehicle created', 'Close', { duration: 2000 });
      });
    }
  }

  onCancel(){
    this.router.navigate(['/vehicle']);
  }

}
