import { Component, OnInit } from '@angular/core';
import { Captin, CaptinService } from '../../../../Service/Test Service/captin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
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
import { ActivationStateDtoModel } from '../../../../Models/ActivationState/ActivationState.Model';
import { CaptinStateEnum } from '../../../../Enum/CaptinStete.Enum';
import { PriorityAssignEnum } from '../../../../Enum/PriorityAssign.Enum';
import { CaptinActivationStateService } from '../../../../Service/Test Service/captin-activation-state.service';
import { AuthService } from '../../../../Service/Test Service/auth.service';

export interface State{
  label: string;
  value: number;
}

@Component({
  selector: 'app-captin-update',
  templateUrl: './captin-update.component.html',
  styleUrl: './captin-update.component.css'
})
export class CaptinUpdateComponent implements OnInit {
  captinId!:string;
  natonalities:NationalityDtoModel[] =[];

  WorkingRejoins:AreaDtoModel [] = [];
  selectedAreaId: string | null = null;
  chips: Area[] = [];
  existingData!: any[];

  commissionRoles:CommissionRuleDtoModel[]=[];
  empTypes:EmployeeModel[]=[];
  vehicleTypes:VehicleTypeDtoModel[]=[];
  vehicles:Vehicle[]=[];
  searchObj={};
  activationStates:ActivationStateDtoModel[]=[]
  captinStates: State[] = [];
  priorityAssigns: State[] = [];
  showPassword: boolean = false;
  regionType = 6;
  userId !:any ;

  captin: Captin = {
    id:'',
    name: '',
    email: '',
    phoneNumber: "",
    telephone:"",
    nationalityId:'',
    nationalId: '',
    nationalIdImagePath:'',
    nationalIdExpiryDate:undefined,
    driverLicense:'',
    driverLicenseImagePath:'',
    driverLicenseExpiryDate:undefined,
    drivingLicense:'',
    drivingLicenseImagePath:'',
    drivingLicenseExpiryDate:undefined,
    contractFilePath:'',
    joinedDate:undefined,
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
    lastUpdatedById:''
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
    private authService:AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.getNatonalities();
    this.getAreaByType(this.regionType);
    this.getCommissionRoles();
    this.getEmplyeeTypes();
    this.getVehicleTypes();
    this.getVehicles();
    this.initializeChips();
    this.captinStates = this.getCaptinStates();
    this.priorityAssigns = this.getpriorityAssign();
    this.getActivationState();

    let idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
      this.captinId = idParam;
      this.getCaptinDetails(this.captinId);
    } else {
      // Handle the error or navigate away if the id is null
      this.router.navigate(['/notfound']);
      this.snackBar.open('Invalid Captin ID', 'Close', { duration: 2000 });
    }
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

  initializeChips() {
    // this.chips = this.WorkingRejoins.filter(area => this.existingData.includes(area.id));
    if (this.existingData && this.WorkingRejoins) {
      this.chips = this.WorkingRejoins.filter(area => this.existingData.includes(area.id));
      console.log('Initialized chips:', this.chips); // Debugging line
    } else {
        console.warn('Areas or existingData is not defined');
    }
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

  getCaptinDetails(captinId: string): void {
    this.captinService.getCaptinById(captinId).subscribe(
      (data: any) => {
        this.captin = data.data;
        console.log("cap", this.captin);
        this.existingData = this.captin.captainAreas;
        if (this.captin.nationalIdExpiryDate || this.captin.driverLicenseExpiryDate || this.captin.drivingLicenseExpiryDate || this.captin.joinedDate ) {
          this.captin.nationalIdExpiryDate = this.datePipe.transform(this.captin.nationalIdExpiryDate, 'yyyy-MM-dd') || undefined;
          this.captin.driverLicenseExpiryDate = this.datePipe.transform(this.captin.driverLicenseExpiryDate, 'yyyy-MM-dd') || undefined;
          this.captin.drivingLicenseExpiryDate = this.datePipe.transform(this.captin.drivingLicenseExpiryDate, 'yyyy-MM-dd') || undefined;
          this.captin.joinedDate = this.datePipe.transform(this.captin.joinedDate, 'yyyy-MM-dd') || undefined;
        }
      },
      (error: any) => {
        console.error('Error fetching captin:', error);
        this.snackBar.open('Error fetching captin', 'Close', { duration: 2000 });
      }
    );
  }

  onSubmit(form: NgForm): void {
    this.captin.lastUpdatedById= this.userId;
    if (form.valid && this.captinId !== null) {
      // form.value.captinWorkingRegionId = this.chips.map(chip => chip.id);
      this.captinService.updateCaptin(this.captin).subscribe(() => {
        this.router.navigate(['/captin']);
        this.snackBar.open('Captin updated', 'Close', { duration: 2000 });
      });
    }
  }

  onCancel(){
    this.router.navigate(['/captin']);
  }
}
