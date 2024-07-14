import { PriorityAssignEnum } from './../../../../Enum/PriorityAssign.Enum';
import { Component } from '@angular/core';
import { CaptinService } from '../../../../Service/Test Service/captin.service';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Captin } from '../../../../Service/Test Service/captin.service';
import { NationalityDtoModel } from '../../../../Models/Nationality/Nationality.Model';
import { AreaDtoModel } from '../../../../Models/Area/Area.Model';
import { Area, AreaService } from '../../../../Service/Test Service/area.service';
import { NationalityService } from '../../../../Service/Test Service/nationality.service';
import { CommissionRuleDtoModel } from '../../../../Models/CommissionRule/CommissionRule.Model';
import { CommissionRoleService } from '../../../../Service/Test Service/commission-role.service';
import { EmplyeeTypeService } from '../../../../Service/Test Service/emplyee-type.service';
import { EmployeeModel } from '../../../../Models/Employee/Employee.Model';
import { VehicleTypeDtoModel } from '../../../../Models/VehicleType/VehicleType.Model';
import { VehicleTypeService } from '../../../../Service/Test Service/vehicle-type.service';
import { Vehicle, VehicleService } from '../../../../Service/Test Service/vehicle.service';
import { SearchObj } from '../../../../Core/SearchControls/Common/SearchObj';
import { CaptinStateEnum } from '../../../../Enum/CaptinStete.Enum';
import { CaptinActivationStateService } from '../../../../Service/Test Service/captin-activation-state.service';
import { ActivationStateDtoModel } from '../../../../Models/ActivationState/ActivationState.Model';

export interface State{
  label: string;
  value: number;
}

@Component({
  selector: 'app-captin-create',
  templateUrl: './captin-create.component.html',
  styleUrl: './captin-create.component.css'
})
export class CaptinCreateComponent {
  natonalities:NationalityDtoModel[] =[];
  WorkingRejoins:AreaDtoModel [] = [];
  selectedAreaId: string | null = null;
  chips: Area[] = [];
  commissionRoles:CommissionRuleDtoModel[]=[];
  empTypes:EmployeeModel[]=[];
  vehicleTypes:VehicleTypeDtoModel[]=[];
  vehicles:Vehicle[]=[];
  activationStates:ActivationStateDtoModel[]=[]
  searchObj={};
  captinStates: State[] = [];
  showPassword: boolean = false;

  priorityAssigns: State[] = [];
  regionType = 6;

  captin: Captin = {
    name: '',
    email: '',
    phoneNumber: '',
    telephone:'',
    password:'',
    nationalityId:'',
    nationalId: '',
    nationalIdImage:'',
    nationalIdImagePath:'',
    nationalIdExpiryDate:'',
    driverLicense:'',
    driverLicenseImage:'',
    driverLicenseImagePath:'',
    driverLicenseExpiryDate:'',
    drivingLicense:'',
    drivingLicenseImage:'',
    drivingLicenseImagePath:'',
    drivingLicenseExpiryDate:'',
    contractFile:'',
    contractFilePath:'',
    joinedDate:'',
    orderAmount:0,
    monthlySalary:0,
    commissionRuleId:'',
    captinState:0,
    priorityAssign:0,
    captinWorkingRegionId:'',
    captainAreas:[],
    activationStateId:'',
    employmentTypeId:'',
    vehicleTypeId:'',
    assignVehicleId:'',
    createdById:''
  };


  constructor(
    private captinService: CaptinService,
    private areaService :AreaService,
    private nationalityService:NationalityService,
    private commissionRoleService:CommissionRoleService,
    private emplyeeTypeService:EmplyeeTypeService,
    private vehicleTypeService:VehicleTypeService,
    private vehicleService:VehicleService,
    private captinActivationStateService:CaptinActivationStateService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.getNatonalities();
    // this.getAreas();
    this.getAreaByType(this.regionType);
    this.getCommissionRoles();
    this.getEmplyeeTypes();
    this.getVehicleTypes();
    this.getVehicles();
    this.captinStates = this.getCaptinStates();
    this.priorityAssigns = this.getpriorityAssign();
    this.getActivationState();
  }

  toggllePassword() {
    this.showPassword = !this.showPassword;
  }

  getCaptinStates() {
    return Object.keys(CaptinStateEnum)
      .filter(key => isNaN(Number(key)))
      .map(key => {
        const enumKey = key as keyof typeof CaptinStateEnum;
        return { label: key, value: CaptinStateEnum[enumKey] };
      });
  }

  getpriorityAssign() {
    return Object.keys(PriorityAssignEnum)
      .filter(key => isNaN(Number(key)))
      .map(key => {
        const enumKey = key as keyof typeof PriorityAssignEnum;
        return { label: key, value: PriorityAssignEnum[enumKey] };
      });
  }

  getActivationState(){
    this.captinActivationStateService.getActivationStateLite(this.searchObj).subscribe(
      (activationState: ActivationStateDtoModel[]) => {
        this.activationStates = activationState;
      },
      (error: any) => {
        console.error('Error fetching vehicles:', error);
      }
    );
  }

  getNatonalities(){
    this.nationalityService.getNatonalities(this.searchObj).subscribe(
      (natonalities: NationalityDtoModel[]) => {
        this.natonalities = natonalities; // Directly assign the array
      },
      (error: any) => {
        console.error('Error fetching natonalities:', error);
      }
    );
  }

  // getAreas(){
  //   this.areaService.getAreas(this.searchObj).subscribe(
  //     (areas: AreaDtoModel[]) => {
  //       this.WorkingRejoins = areas; // Directly assign the array
  //     },
  //     (error: any) => {
  //       console.error('Error fetching areas:', error);
  //     }
  //   );
  // }

  getAreaByType(type:number){
    this.areaService.getAreaByAreaType(type).subscribe( (res:any)=>{
      this.WorkingRejoins = res.data;
    },
    (error: any) => {
        console.error('Error fetching areas:', error);
      }
    );
  }

  addArea(event: Event) {
    const selectedArea = this.WorkingRejoins.find(area => area.id === this.selectedAreaId);
    if (selectedArea && !this.chips.find(chip => chip.id === this.selectedAreaId)) {
        this.chips.push(selectedArea);
        this.selectedAreaId = null; // Reset the selected value
    }
  }

  removeChip(chip: Area) {
      this.chips = this.chips.filter(c => c.id !== chip.id);
  }


  getCommissionRoles(){
    this.commissionRoleService.getCommissionRoles(this.searchObj).subscribe(
      (commissionRoles: CommissionRuleDtoModel[]) => {
        this.commissionRoles = commissionRoles; // Directly assign the array
      },
      (error: any) => {
        console.error('Error fetching commission roles:', error);
      }
    );
  }

  getEmplyeeTypes(){
    this.emplyeeTypeService.getEmplyeeTypes(this.searchObj).subscribe(
      (empTypes: EmployeeModel[]) => {
        this.empTypes = empTypes;
      },
      (error: any) => {
        console.error('Error fetching Emplyee Types:', error);
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

  getVehicles(){
    this.vehicleService.getVehiclesLite(this.searchObj).subscribe(
      (vehicles: Vehicle[]) => {
        this.vehicles = vehicles;
      },
      (error: any) => {
        console.error('Error fetching vehicles:', error);
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

          if (imageType === 'nationalIdImage') {
            this.captin.nationalIdImage = processedImg;
            this.captin.nationalIdImagePath = file.name;
          } else if (imageType === 'contractFile') {
            this.captin.contractFile = processedImg;
            this.captin.contractFilePath = file.name;
          } else if (imageType === 'driverLicenseImage') {
            this.captin.driverLicenseImage = processedImg;
            this.captin.driverLicenseImagePath = file.name;
          } else if (imageType === 'drivingLicenseImage') {
            this.captin.drivingLicenseImage = processedImg;
            this.captin.drivingLicenseImagePath = file.name;
          }
        };
      }
    }
  }

  onSubmit(form: NgForm): void {

    const selectedAreaIds = this.chips.map(chip => chip.id);
    // Handle form submission and pass the selectedAreaIds
    this.captin.captainAreas =  selectedAreaIds;
    this.captin.createdById = '8c037a32-68d7-4c38-913e-311ce44fa16e';
    if (form.valid) {
      let value = form.value;
      this.captinService.createCaptin(this.captin).subscribe(() => {
        this.router.navigate(['/captin']);
        this.snackBar.open('Captin created', 'Close', { duration: 2000 });
      });
    }
  }

  onCancel(){
    this.router.navigate(['/captin']);
  }
}
