import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClientModel } from '../../../../Models/Client/Client.Model';
import { ClientService } from '../../../../Service/Test Service/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { ClientIndustryDtoModel } from '../../../../Models/ClientIndustry/ClientIndustry.Model';
import { ClientContactPositionDtoModel } from '../../../../Models/ClientContactPosition/ClientContactPosition.Model';
import { BankDtoModel } from '../../../../Models/Bank/Bank.Model';
import { BankService } from '../../../../Service/Test Service/bank.service';
import { AreaDtoModel } from '../../../../Models/Area/Area.Model';
import { AreaService } from '../../../../Service/Test Service/area.service';
import { IndustryService } from '../../../../Service/Test Service/industry.service';
import { ClientContactPositionService } from '../../../../Service/Test Service/client-contact-position.service';
import { SearchObj } from '../../../../Core/SearchControls/Common/SearchObj';
import { MatTableDataSource } from '@angular/material/table';
import { ClientState } from '../client-create/client-create.component';
import { ClientStateEnum } from '../../../../Enum/ClientState.Enum';
import { AuthService } from '../../../../Service/Test Service/auth.service';

@Component({
  selector: 'app-client-update',
  templateUrl: './client-update.component.html',
  styleUrl: './client-update.component.css'
})
export class ClientUpdateComponent {
  clientId!:string;
  deleted = ["True", "False"];
  banks: BankDtoModel[] = [];
  positions:ClientContactPositionDtoModel [] = [];
  areas:AreaDtoModel [] = [];
  industries: ClientIndustryDtoModel[] = [];
  clientStates: ClientState[] = [];
  showPassword: boolean = false;
  searchObj={};
  location: string ="";
  regionType = 4;
  userId!: any;

  client: ClientModel = new ClientModel();

  constructor(
    private clientService: ClientService,
    private bankService :BankService,
    private areaService :AreaService,
    private industryService :IndustryService,
    private clientContactPositionService :ClientContactPositionService,
    private authService:AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.getBanks();
    this.getAreaByType(this.regionType);
    this.getPsitions();
    this.getiIndustries();
    this.clientStates = this.getClientStates()

    let idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
      this.clientId = idParam;
      this.getClientDetails(this.clientId);
    } else {
      // Handle the error or navigate away if the id is null
      this.router.navigate(['/notfound']);
      this.snackBar.open('Invalid Client ID', 'Close', { duration: 2000 });
    }
  }

  toggllePassword() {
    this.showPassword = !this.showPassword;
  }

  getBanks(){
    this.bankService.getBanks(this.searchObj).subscribe(
      (banks: BankDtoModel[]) => {
        this.banks = banks; // Directly assign the array
      },
      (error: any) => {
        console.error('Error fetching banks:', error);
      }
    );
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

  getClientStates() {
    return Object.keys(ClientStateEnum)
      .filter(key => isNaN(Number(key)))
      .map(key => {
        const enumKey = key as keyof typeof ClientStateEnum;
        return { label: key, value: ClientStateEnum[enumKey] };
      });
  }

  getiIndustries(){
    this.industryService.getiIndustries(this.searchObj).subscribe(
      (industries: ClientIndustryDtoModel[]) => {
        this.industries = industries; // Directly assign the array
      },
      (error: any) => {
        console.error('Error fetching industries:', error);
      }
    );
  }

  getPsitions(){
    this.clientContactPositionService.getPsitions(this.searchObj).subscribe(
      (positions: ClientContactPositionDtoModel[]) => {
        this.positions = positions; // Directly assign the array
      },
      (error: any) => {
        console.error('Error fetching positions:', error);
      }
    );
  }

  getClientDetails(clientId: string): void {
    this.clientService.getClientById(clientId).subscribe(
      (data:any) => {
        this.client = data.data;
        this.updateFormWithLocation();
        if (this.client.agreementEffictiveDate || this.client.agreementExpiryDate || this.client.businessStart || this.client.businessEnd ) {
          this.client.businessStart = this.datePipe.transform(this.client.businessStart, 'yyyy-MM-dd') || undefined;
          this.client.businessEnd = this.datePipe.transform(this.client.businessEnd, 'yyyy-MM-dd') || undefined;
          this.client.agreementEffictiveDate = this.datePipe.transform(this.client.agreementEffictiveDate, 'yyyy-MM-dd') || undefined;
          this.client.agreementExpiryDate = this.datePipe.transform(this.client.agreementExpiryDate, 'yyyy-MM-dd') || undefined;
        }
      },
      (error: any) => {
        console.error('Error fetching client:', error);
        this.snackBar.open('Error fetching client', 'Close', { duration: 2000 });
      }
    );
  }

  splitLocation(location: string): { latitude: number, longitude: number } {
    const [latitude, longitude] = location.split(',').map(coord => parseFloat(coord.trim()));
    return { latitude, longitude };
  }

  updateFormWithLocation(): void {
    this.location = `${this.client.clientLocationLatitude}, ${this.client.clientLocationLongitude}`;
  }

  onSubmit(form: NgForm): void {
    const { latitude, longitude } = this.splitLocation(this.location);
    this.client.clientLocationLatitude = latitude;
    this.client.clientLocationLongitude = longitude;

    this.client.lastUpdatedById= this.userId;
    if (form.valid && this.clientId !== null) {
      this.clientService.updateClient(this.client).subscribe(() => {
        this.router.navigate(['/client']);
        this.snackBar.open('Client updated', 'Close', { duration: 2000 });
      });
    }
  }

  onCancel(){
    this.router.navigate(['/client']);
  }
}
