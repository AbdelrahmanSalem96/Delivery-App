import { Component, OnInit } from '@angular/core';
import { ClientModel } from '../../../../Models/Client/Client.Model';
import { ClientService } from '../../../../Service/Test Service/client.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ClientIndustryDtoModel } from '../../../../Models/ClientIndustry/ClientIndustry.Model';
import { ClientContactPositionDtoModel } from '../../../../Models/ClientContactPosition/ClientContactPosition.Model';
import { BankDtoModel } from '../../../../Models/Bank/Bank.Model';
import { BankService } from '../../../../Service/Test Service/bank.service';
import { AreaDtoModel } from '../../../../Models/Area/Area.Model';
import { AreaService } from '../../../../Service/Test Service/area.service';
import { IndustryService } from '../../../../Service/Test Service/industry.service';
import { ClientContactPositionService } from '../../../../Service/Test Service/client-contact-position.service';
import { SearchObj } from '../../../../Core/SearchControls/Common/SearchObj';
import { ClientStateEnum } from '../../../../Enum/ClientState.Enum';
import { SearchTypeEnum } from '../../../../Core/SearchControls/Common/SearchTypeEnum';
import { CriteriaSearch } from '../../../../Core/SearchControls/PaggedCriteriaInfo/CriteriaSearch';
import { AreaTypeEnum } from '../../../../Enum/Area.Enum';
import { DataServiceService } from '../../../../Service/Shared/DataService.Service';

export interface ClientState{
  label: string;
  value: number;
}

@Component({
  selector: 'app-client-create',
  templateUrl: './client-create.component.html',
  styleUrl: './client-create.component.css',
})
export class ClientCreateComponent implements OnInit {
  deleted = ['True', 'False'];
  banks: BankDtoModel[] = [];
  positions: ClientContactPositionDtoModel[] = [];
  areas: AreaDtoModel[] = [];
  industries: ClientIndustryDtoModel[] = [];
  showPassword: boolean = false;
  searchObj = {};
  searchObj2 :SearchObj = new SearchObj();
  clientStates: ClientState[] = [];
  location: string ="";
  regionType = 4;

  client: ClientModel = {
    id: '',
    name: '',
    email: '',
    password: '',
    nameAr: '',
    phoneNumber: '',
    logoPath: '',
    logoImage: '',
    clientState: 0,
    clientAddress: '',
    clientLocationLatitude: 0,
    clientLocationLongitude: 0,
    contactName: '',
    contactEmail: '',
    contactMobil: '',
    ownerName: '',
    ownerEmail: '',
    ownerId: '',
    ownerIdImage: '',
    ownerIdImagePath: '',
    crRegisterationNumber: '',
    crRegisterationNumberImage: '',
    crRegisterationNumberImagePath: '',
    vatRegisterationNumber: '',
    vatRegisterationNumberImage: '',
    vatRegisterationNumberImagePath: '',
    accountName: '',
    accountNumber: '',
    ibanNumber: '',
    businessStart: '',
    businessEnd: '',
    agreementImage: '',
    agreementImagePath: '',
    agreementEffictiveDate: '',
    agreementExpiryDate: '',
    applicationIdentityUserId: '',
    clientIndustryId: '',
    clientAreaId: '',
    clientContactPositionId: '',
    bankId: '',
    bankBranch:'',
    createdById: '',
  };

  constructor(
    private clientService: ClientService,
    private bankService: BankService,
    private areaService: AreaService,
    private industryService: IndustryService,
    private clientContactPositionService: ClientContactPositionService,
    private _dataServiceService:DataServiceService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getBanks();
    this.getPsitions();
    this.getiIndustries();
    this.getAreaByType(this.regionType);
    this.clientStates = this.getClientStates();

    //-----------
    // let searchAreafilter :CriteriaSearch<AreaDtoModel> = new CriteriaSearch<AreaDtoModel>();
    // let searchAreaObjs :SearchObj =new SearchObj();
    // searchAreaObjs.Name="AreaType";
    // searchAreaObjs.Type=SearchTypeEnum.Enum;
    // searchAreaObjs.Value=AreaTypeEnum.Region.toString();
    // searchAreafilter.SearchObjs.push(searchAreaObjs);
    // this._dataServiceService.areaService.getLite(searchAreafilter).subscribe(res=>{
    //   this.areasLite=res.data;
    // });
  }

  toggllePassword() {
    this.showPassword = !this.showPassword;
  }

  splitLocation(location: string): { latitude: number, longitude: number } {
    const [latitude, longitude] = location.split(',').map(coord => parseFloat(coord.trim()));
    return { latitude, longitude };
  }

  getBanks() {
    this.bankService.getBanks(this.searchObj).subscribe(
      (banks: BankDtoModel[]) => {
        this.banks = banks; // Directly assign the array
      },
      (error: any) => {
        console.error('Error fetching banks:', error);
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

  // getAreas() {
  //   this.searchObj2.Name="AreaType";
  //   this.searchObj2.Type=SearchTypeEnum.Enum;
  //   this.searchObj2.Value=AreaTypeEnum.Region.toString();
  //   this.areaService.getAreas(this.searchObj2).subscribe(
  //     (areas: AreaDtoModel[]) => {
  //       this.areas = areas; // Directly assign the array
  //     },
  //     (error: any) => {
  //       console.error('Error fetching areas:', error);
  //     }
  //   );
  // }

  getAreaByType(type:number){
    this.areaService.getAreaByAreaType(type).subscribe( (res:any)=>{
      this.areas = res.data;
    },
    (error: any) => {
        console.error('Error fetching areas:', error);
      }
    );
  }

  getiIndustries() {
    this.industryService.getiIndustries(this.searchObj).subscribe(
      (industries: ClientIndustryDtoModel[]) => {
        this.industries = industries; // Directly assign the array
      },
      (error: any) => {
        console.error('Error fetching industries:', error);
      }
    );
  }

  getPsitions() {
    this.clientContactPositionService.getPsitions(this.searchObj).subscribe(
      (positions: ClientContactPositionDtoModel[]) => {
        this.positions = positions; // Directly assign the array
      },
      (error: any) => {
        console.error('Error fetching positions:', error);
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
          debugger;

          const base64Image = reader.result as string;
          const processedImg = this.processBase64Image(base64Image);

          if (imageType === 'logoImage') {
            this.client.logoImage = processedImg;
            this.client.logoPath = file.name;
          } else if (imageType === 'ownerIdImage') {
            this.client.ownerIdImage = processedImg;
            this.client.ownerIdImagePath = file.name;
          } else if (imageType === 'agreementImage') {
            this.client.agreementImage = processedImg;
            this.client.agreementImagePath = file.name;
          } else if (imageType === 'crRegisterationNumberImage') {
            this.client.crRegisterationNumberImage = processedImg;
            this.client.crRegisterationNumberImagePath = file.name;
          } else if (imageType === 'vatRegisterationNumberImage') {
            this.client.vatRegisterationNumberImage = processedImg;
            this.client.vatRegisterationNumberImagePath = file.name;
          }
        };
      }
    }
  }

  onSubmit(form: NgForm): void {

    const { latitude, longitude } = this.splitLocation(this.location);
    this.client.clientLocationLatitude = latitude;
    this.client.clientLocationLongitude = longitude;

    this.client.createdById = '8c037a32-68d7-4c38-913e-311ce44fa16e';
    if (form.valid) {
      this.clientService.createClient(this.client).subscribe((data) => {
        this.router.navigate(['/client']);
        this.snackBar.open('Client created', 'Close', { duration: 2000 });
      });
    }
  }

  onCancel() {
    this.router.navigate(['/client']);
  }
}
