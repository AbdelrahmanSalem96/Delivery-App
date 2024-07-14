import { InitialConstants } from '../../Core/Constant/InitialConstant';

export class CreateVehicleOwnerModel{
    name:string= InitialConstants.DefaultString;
    email:string= InitialConstants.DefaultString;
    phoneNumber:string= InitialConstants.DefaultString;
    createdById:string = InitialConstants.DefaultString;
}

export class UpdateVehicleOwnerModel{
    id:string= InitialConstants.DefaultString;
    name:string= InitialConstants.DefaultString;
    email:string= InitialConstants.DefaultString;
    phoneNumber:string= InitialConstants.DefaultString;
    lastUpdatedById:string = InitialConstants.DefaultString;
}

export class DeleteVehicleOwnerModel{
    id:string= InitialConstants.DefaultString;
    deletedById:string = InitialConstants.DefaultString;
}

export class VehicleOwnerDtoModel{
    id:string= InitialConstants.DefaultString;
    name:string= InitialConstants.DefaultString;
    email:string= InitialConstants.DefaultString;
    phoneNumber:string= InitialConstants.DefaultString;
}


export interface VehicleOwnerLiteModel{
    id:string;
    name:string;
  }