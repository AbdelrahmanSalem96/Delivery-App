import { Component, OnInit } from '@angular/core';
import { ClientBranchModel } from '../../../../Models/Client Branch/ClientBranch.Model';
import { ClientBranchService } from '../../../../Service/Test Service/client-branch.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';
import { AreaService } from '../../../../Service/Test Service/area.service';
import { AreaDtoModel } from '../../../../Models/Area/Area.Model';
import { ClientService } from '../../../../Service/Test Service/client.service';
import { ClientModel, getLightClientModel } from '../../../../Models/Client/Client.Model';
import { SearchObj } from '../../../../Core/SearchControls/Common/SearchObj';
import { ClientBranchStateEnum } from '../../../../Enum/ClientBranchState.Enum';
import { AuthService } from '../../../../Service/Test Service/auth.service';

export interface ClientBranchState{
  label: string;
  value: number;
}


@Component({
  selector: 'app-client-branch-create',
  templateUrl: './client-branch-create.component.html',
  styleUrl: './client-branch-create.component.css'
})
export class ClientBranchCreateComponent implements OnInit{
  booleanValue = [true, false];
  loadCreatedBy = 132;
  showPassword: boolean = false;
  areas:AreaDtoModel [] = [];
  client: ClientModel = new ClientModel();
  clientName!:string;
  clientId!:string;
  branchId !:string;
  checkID!:boolean;
  searchObj={};
  searchClientObj={id:""};
  clientBranchStates: ClientBranchState[] = [];
  selectedClientBranchState!: ClientBranchStateEnum;
  location: string ="";
  regionType = 4;
  userId!:any;
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
    createdById: '',
  };


  constructor(
    private clientBranchService: ClientBranchService,
    private clientService: ClientService,
    private authService:AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private areaService :AreaService,
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.clientBranchStates = this.getClientBranchStates()
    this.getAreaByType(this.regionType);
    let paramId = this.route.snapshot.paramMap.get('id');
    if(paramId !== null){
      this.checkID = true;
      this.clientId = paramId;
      this.getClients(this.clientId);
    }else{
      this.checkID = false;
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

  splitLocation(location: string): { latitude: number, longitude: number } {
    const [latitude, longitude] = location.split(',').map(coord => parseFloat(coord.trim()));
    return { latitude, longitude };
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
          debugger;

          const base64Image = reader.result as string;
          const processedImg = this.processBase64Image(base64Image);

          if (imageType === 'crRegisterationNumberImage') {
            this.branch.crRegisterationNumberImage = processedImg;
            this.branch.crRegisterationNumberImagePath = file.name;
          } else if (imageType === 'vatRegisterationNumberImage') {
            this.branch.vatRegisterationNumberImage = processedImg;
            this.branch.vatRegisterationNumberImagePath = file.name;
          }
        };
      }
    }
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.branch = form.value;
      const { latitude, longitude } = this.splitLocation(this.location);
      this.branch.branchLocationLatitude = latitude;
      this.branch.branchLocationLongitude = longitude;
      this.branch.createdById = this.userId;
      if(this.clientId !== null){
        this.branch.clientId = this.clientId;
        this.clientBranchService.createClientBranch(this.branch).subscribe(() => {
          this.router.navigate(['client',this.clientId,'clientbranch']);
          this.snackBar.open('Client Branch created', 'Close', { duration: 2000 });
        });
      }else
      this.clientBranchService.createClientBranch(this.branch).subscribe(() => {
        this.router.navigate(['client']);
        this.snackBar.open('Client Branch created', 'Close', { duration: 2000 });
      });
    }
  }

  onCancel(){
    if(this.clientId !== null){
      this.router.navigate(['client']);
    }else{
      this.router.navigate(['clientbranch']);
    }
  }
}
