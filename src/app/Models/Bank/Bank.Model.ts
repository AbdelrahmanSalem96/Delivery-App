import { InitialConstants } from '../../Core/Constant/InitialConstant';

export class CreateBankModel{
    name:string= InitialConstants.DefaultString;
    createdById:string = InitialConstants.DefaultString;
}

export class UpdateBankModel{
    id:string= InitialConstants.DefaultString;
    name:string= InitialConstants.DefaultString;
    lastUpdatedById:string = InitialConstants.DefaultString;
}

export class DeleteBankModel{
    id:string= InitialConstants.DefaultString;
    deletedById:string = InitialConstants.DefaultString;
}

export class BankDtoModel{
    id:string= InitialConstants.DefaultString;
    name:string= InitialConstants.DefaultString;
}