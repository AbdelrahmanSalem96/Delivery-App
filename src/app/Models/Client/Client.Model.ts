import { InitialConstants } from "../../Core/Constant/InitialConstant";
import { BankDtoModel } from "../Bank/Bank.Model";
import { ClientContactPositionDtoModel } from "../ClientContactPosition/ClientContactPosition.Model";
import { ClientIndustryDtoModel } from "../ClientIndustry/ClientIndustry.Model";

export class ClientModel{
  id ?: string;
  name !: string;
  email !: string;
  password !: string;
  nameAr !: string;
  phoneNumber !: string;
  logoPath ?: string;
  logoImage ?: string;
  clientState ?: number;
  clientAddress ?: string;
  clientLocationLatitude !: number;
  clientLocationLongitude !: number;
  contactName ?:string;
  contactEmail ?:string;
  contactMobil ?:string;
  ownerName ?: string;
  ownerEmail ?: string;
  ownerId ?:string;
  ownerIdImage?:string;
  ownerIdImagePath ?:string;
  crRegisterationNumber ?: string;
  crRegisterationNumberImage?:string;
  crRegisterationNumberImagePath ?: string;
  vatRegisterationNumber ?: string;
  vatRegisterationNumberImage?:string;
  vatRegisterationNumberImagePath ?: string;
  accountName ?: string;
  accountNumber ?: string;
  ibanNumber ?: string;
  businessStart ?: string;
  businessEnd ?: string;
  agreementImage?:string;
  agreementImagePath ?: string;
  agreementEffictiveDate ?: string;
  agreementExpiryDate ?: string;
  applicationIdentityUserId?:string ;
  clientIndustryId ?: string ;
  clientAreaId ?: string;
  clientContactPositionId ?: string;
  bankId ?:string ;
  bankBranch?:string;
  createdById ?: string;
  lastUpdatedById?:string;
}

export class DeleteClientModel{
  id:string= InitialConstants.DefaultString;
  deletedById:string = InitialConstants.DefaultString;
}

export class getLightClientModel{
  id:string= InitialConstants.DefaultString;
  name:string = InitialConstants.DefaultString;
}

