import { InitialConstants } from '../../Core/Constant/InitialConstant';

export class CreateClientContactPositionModel{
    name:string= InitialConstants.DefaultString;
    createdById:string = InitialConstants.DefaultString;
}

export class UpdateClientContactPositionModel{
    id:string= InitialConstants.DefaultString;
    name:string= InitialConstants.DefaultString;
    lastUpdatedById:string = InitialConstants.DefaultString;
}

export class DeleteClientContactPositionModel{
    id:string= InitialConstants.DefaultString;
    deletedById:string = InitialConstants.DefaultString;
}

export class ClientContactPositionDtoModel{
    id:string= InitialConstants.DefaultString;
    name:string= InitialConstants.DefaultString;
}