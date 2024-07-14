import { InitialConstants } from '../../Core/Constant/InitialConstant';

export class CreateTicketTypeModel{
    name:string= InitialConstants.DefaultString;
    createdById:string = InitialConstants.DefaultString;
}

export class UpdateTicketTypeModel{
    id:string= InitialConstants.DefaultString;
    name:string= InitialConstants.DefaultString;
    lastUpdatedById:string = InitialConstants.DefaultString;
}

export class DeleteTicketTypeModel{
    id:string= InitialConstants.DefaultString;
    deletedById:string = InitialConstants.DefaultString;
}

export class TicketTypeDtoModel{
    id:string= InitialConstants.DefaultString;
    name:string= InitialConstants.DefaultString;
}