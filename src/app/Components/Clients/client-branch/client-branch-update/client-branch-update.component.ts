import { Component } from '@angular/core';
import { ClientBranchService } from '../../../../Service/Test Service/client-branch.service';
import { ClientBranchModel } from '../../../../Models/Client Branch/ClientBranch.Model';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe, Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { ClientModel, getLightClientModel } from '../../../../Models/Client/Client.Model';
import { AreaDtoModel } from '../../../../Models/Area/Area.Model';
import { ClientService } from '../../../../Service/Test Service/client.service';
import { AreaService } from '../../../../Service/Test Service/area.service';
import { SearchObj } from '../../../../Core/SearchControls/Common/SearchObj';
import { ClientBranchStateEnum } from '../../../../Enum/ClientBranchState.Enum';
import { ClientBranchState } from '../client-branch-create/client-branch-create.component';
import { AuthService } from '../../../../Service/Test Service/auth.service';

@Component({
  selector: 'app-client-branch-update',
  templateUrl: './client-branch-update.component.html',
  styleUrl: './client-branch-update.component.css'
})
export class ClientBranchUpdateComponent {

  branchId!:string;
  booleanValue = [true, false];
  showPassword: boolean = false;
  areas:AreaDtoModel [] = [];
  client!: getLightClientModel;
  clientName!:string;
  clientId!:string;
  searchObj={};
  searchClientObj={id:""};
  checkID!:boolean;
  clientBranchStates: ClientBranchState[] = [];
  selectedClientBranchState!: ClientBranchStateEnum;
  location: string ="";
  regionType = 4;
  userId!: any;

  branch: ClientBranchModel = {
    id:'',
    name : '',
    email: '',
    password: '',
    phoneNumber: '',
    clientBranchState : '',
    startWorkDate : '',
    branchAddress : '',
    branchAdminName : '',
    autoAssign : true,
    verifyCaptinReatchShop : true,
    verifyCaptinReatchLocation : true,
    applicationIdentityUserId:'',
    clientId : '',
    clientBranchAreaId : '',
    branchLocationLatitude : 0,
    branchLocationLongitude : 0,
    crRegisterationNumber : '',
    crRegisterationNumberImage:'',
    crRegisterationNumberImagePath : '',
    vatRegisterationNumber : '',
    vatRegisterationNumberImage:'',
    vatRegisterationNumberImagePath : '',
    lastUpdatedById:''
  };

  constructor(
    private clientBranchService: ClientBranchService,
    private clientService: ClientService,
    private authService:AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private areaService :AreaService,
    private route: ActivatedRoute,
    private _location: Location,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.clientBranchStates = this.getClientBranchStates()
    this.getAreaByType(this.regionType);
    let idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
      this.branchId = idParam;
      this.checkID = true;
      this.getClientBranchDetails(this.branchId);
    } else {
      // Handle the error or navigate away if the id is null
      this.router.navigate(['/notfound']);
      this.snackBar.open('Invalid Branch ID', 'Close', { duration: 2000 });
    }
  }

  toggllePassword() {
    this.showPassword = !this.showPassword;
  }

  getClientBranchStates() {
    return Object.keys(ClientBranchStateEnum)
      .filter(key => isNaN(Number(key)))
      .map(key => {
        const enumKey = key as keyof typeof ClientBranchStateEnum;
        return { label: key, value: ClientBranchStateEnum[enumKey] };
      });
  }

  getAreaByType(type:number){
    this.areaService.getAreaByAreaType(type).subscribe( (res:any)=>{
      this.areas = res.data;
    },
    (error: any) => {
        console.error('Error fetching areas:', error);
      }
    );
  }

  getClients(userId:string){
    this.clientService.getClientsByApplicationUserId(userId).subscribe((data:any) => {
      this.clientName = data.data.name;
    },
    error => {
      console.error('Error fetching items:', error);
    });
  }

  getClientBranchDetails(branchId: string): void {
    this.clientBranchService.getClientBranchById(branchId).subscribe(
      (branch: any) => {
        this.branch = branch.data;
        this.clientId = branch.data.clientId;
        this.getClients(branch.data.clientId);
        this.updateFormWithLocation();
        if (this.branch.startWorkDate ) {
          this.branch.startWorkDate = this.datePipe.transform(this.branch.startWorkDate, 'yyyy-MM-dd') || undefined;
        }
      },
      (error: any) => {
        console.error('Error Fetching Branch:', error);
        this.snackBar.open('Error Fetching Branch', 'Close', { duration: 2000 });
      }
    );
  }

  splitLocation(location: string): { latitude: number, longitude: number } {
    const [latitude, longitude] = location.split(',').map(coord => parseFloat(coord.trim()));
    return { latitude, longitude };
  }

  updateFormWithLocation(): void {
    this.location = `${this.branch.branchLocationLatitude}, ${this.branch.branchLocationLongitude}`;
  }

  onSubmit(form: NgForm): void {
    const { latitude, longitude } = this.splitLocation(this.location);
    this.branch.branchLocationLatitude = latitude;
    this.branch.branchLocationLongitude = longitude;
    this.branch.lastUpdatedById= this.userId;

    if (form.valid && this.branchId !== null) {
      this.branch.clientId = this.clientId;
      this.clientBranchService.updateClientBranch(this.branch).subscribe(() => {
        this.router.navigate(['client',this.clientId,'clientbranch']);
        this.snackBar.open('Branch updated', 'Close', { duration: 2000 });
      });
    }
  }

  onCancel(){
    this.router.navigate(['client',this.clientId,'clientbranch']);
  }
}
