import { InitialConstants } from "../../Core/Constant/InitialConstant";
import { ActivationStateDtoModel } from "../ActivationState/ActivationState.Model";
import { CommissionRuleDtoModel } from "../CommissionRule/CommissionRule.Model";
import { EmploymentTypeDtoModel } from "../EmploymentType/EmploymentType.Model";
import { NationalityDtoModel } from "../Nationality/Nationality.Model";
import { VehicleTypeDtoModel } from "../VehicleType/VehicleType.Model";

export class CaptinModel{
  name?:string;
  mobile?:number;
  telephone?:number;
  nationalId?:number;
  nationalIdImagePath?:string;
  nationalIdExpiryDate?:Date;
  driverLicense?:string;
  driverLicensceImagePath?:string;
  driverLicensceExpiryDate?:Date;
  drivingLicense?:string;
  drivingLicenseImagePath?:string;
  drivingLicenseExpiryDate?:Date;
  contractFilePath?:string;
  joinedDate?:Date;
  OrderAmount?:number;
  monthlySalary?:number;
  applicationIdentityUserId?:string;
  nationalityId?:NationalityDtoModel;
  captinWorkingRegionId?:string;
  area?:string;
  activationStateId?:ActivationStateDtoModel;
  employmentTypeId?:EmploymentTypeDtoModel;
  vehicleTypeId?:VehicleTypeDtoModel;
  assignVehicleId?:string;
  commissionRoleId?:CommissionRuleDtoModel;
  captinState?:number;
  liveLocationLatitude?:number;
  liveLocationLongitude?:number;
  priorityAssign?:string;
}

export class CaptinDtoModel{
  id:string= InitialConstants.DefaultString;
  name:string= InitialConstants.DefaultString;
}

export class DeleteCaptinDtoModel{
  id:string= InitialConstants.DefaultString;
  deletedById:string = InitialConstants.DefaultString;
}
