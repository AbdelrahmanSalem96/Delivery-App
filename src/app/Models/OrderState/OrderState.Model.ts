import { InitialConstants } from '../../Core/Constant/InitialConstant';

export class CreateOrderStateModel{
    name:string= InitialConstants.DefaultString;
    createdById:string = InitialConstants.DefaultString;
}

export class UpdateOrderStateModel{
    id:string= InitialConstants.DefaultString;
    name:string= InitialConstants.DefaultString;
    lastUpdatedById:string = InitialConstants.DefaultString;
}

export class DeleteOrderStateModel{
    id:string= InitialConstants.DefaultString;
    deletedById:string = InitialConstants.DefaultString;
}

export class OrderStateDtoModel{
    id:string= InitialConstants.DefaultString;
    name:string= InitialConstants.DefaultString;
}