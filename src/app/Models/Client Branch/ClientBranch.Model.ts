import { InitialConstants } from "../../Core/Constant/InitialConstant";

export class ClientBranchModel {
  id!: string;
  name !: string;
  email!: string;
  password!: string;
  phoneNumber!: string;
  clientBranchState?: string;
  startWorkDate?: string;
  branchAddress?: string;
  branchAdminName?: string;
  autoAssign?: boolean;
  verifyCaptinReatchShop?: boolean;
  verifyCaptinReatchLocation?: boolean;
  applicationIdentityUserId?: string;
  clientId?: string;
  clientBranchAreaId?: string;
  branchLocationLatitude?: number;
  branchLocationLongitude?: number;
  crRegisterationNumber ?: string;
  crRegisterationNumberImage?:string;
  crRegisterationNumberImagePath ?: string;
  vatRegisterationNumber ?: string;
  vatRegisterationNumberImage?:string;
  vatRegisterationNumberImagePath ?: string;
  createdById?: string;
  lastUpdatedById?:string;
}

export class DeleteBranchModel{
  id:string= InitialConstants.DefaultString;
  deletedById:string = InitialConstants.DefaultString;
}

export class LightBranchModel{
  id:string= InitialConstants.DefaultString;
  name:string = InitialConstants.DefaultString;
}
