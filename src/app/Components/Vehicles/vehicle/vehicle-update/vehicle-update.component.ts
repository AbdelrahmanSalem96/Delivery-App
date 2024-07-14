import { Component } from '@angular/core';
import { AreaService } from '../../../../Service/Test Service/area.service';
import { AreaDtoModel } from '../../../../Models/Area/Area.Model';
import { Vehicle, VehicleService } from '../../../../Service/Test Service/vehicle.service';
import { VehicleTypeService } from '../../../../Service/Test Service/vehicle-type.service';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleTypeDtoModel } from '../../../../Models/VehicleType/VehicleType.Model';
import { VehicleOwnerEnum } from '../../../../Enum/VehicleOwner.Enum';
import { VehicleStateService } from '../../../../Service/Test Service/vehicle-state.service';
import { VehicleStateDtoModel } from '../../../../Models/VehicleState/VehicleState.Model';
import { DatePipe } from '@angular/common';
import { VehicleOwnerLiteModel } from '../../../../Models/VehicleOwner/VehicleOwner.Model';
import { CaptinDtoModel } from '../../../../Models/Captin/Captin.Model';
import { VehicleOwnerService } from '../../../../Service/Test Service/vehicle-owner.service';
import { CaptinService } from '../../../../Service/Test Service/captin.service';

export interface State{
  label: string;
  value: number;
}

@Component({
  selector: 'app-vehicle-update',
  templateUrl: './vehicle-update.component.html',
  styleUrl: './vehicle-update.component.css'
})
export class VehicleUpdateComponent {
  searchObj={};
  WorkingRejoins:AreaDtoModel [] = [];
  regionType = 6;
  vehicleStates:VehicleStateDtoModel[]=[];
  vehicleTypes:VehicleTypeDtoModel[]=[];
  vehicleOwnerTypes:State[] = [];
  vehicleId!:string;
  vehicleOwners:VehicleOwnerLiteModel[]=[];
  captains:CaptinDtoModel[]=[];

  vehicle:Vehicle = {
    name: '' ,
    brand: '' ,
    number: '' ,
    rcBookExpiryDate: undefined ,
    rcBookExpiryDateImage: '' ,
    rcBookExpiryDateImagePath: '' ,
    insuranceExpiryDate: undefined ,
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
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private datePipe: DatePipe
  ){}

  ngOnInit(): void {
    this.getAreaByType(this.regionType);
    this.getVehicleState();
    this.getVehicleTypes();
    this.getVehicleOwner();
    this.getCaptains();
    this.vehicleOwnerTypes = this.geVehicleOwnerType();

    let idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
      this.vehicleId = idParam;
      this.getVehicleDetails(this.vehicleId);
    } else {
      this.router.navigate(['/notfound']);
      this.snackBar.open('Invalid Vehicle ID', 'Close', { duration: 2000 });
    }
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

  getVehicleDetails(vehicleId: string): void {
    this.vehicleService.getVehicleById(vehicleId).subscribe(
      (data: any) => {
        this.vehicle = data.data;
        if (this.vehicle.insuranceExpiryDate || this.vehicle.rcBookExpiryDate ) {
          this.vehicle.insuranceExpiryDate = this.datePipe.transform(this.vehicle.insuranceExpiryDate, 'yyyy-MM-dd') || undefined;
          this.vehicle.rcBookExpiryDate = this.datePipe.transform(this.vehicle.rcBookExpiryDate, 'yyyy-MM-dd') || undefined;
        }
      },
      (error: any) => {
        console.error('Error fetching vehicle:', error);
        this.snackBar.open('Error fetching vehicle', 'Close', { duration: 2000 });
      }
    );
  }

  onSubmit(form: NgForm): void {
    if (form.valid && this.vehicleId !== null) {
      this.vehicleService.updateVehicle(this.vehicle).subscribe(() => {
        this.router.navigate(['/vehicle']);
        this.snackBar.open('Vehicle updated', 'Close', { duration: 2000 });
      });
    }
  }

  onCancel(){
    this.router.navigate(['/vehicle']);
  }

}
