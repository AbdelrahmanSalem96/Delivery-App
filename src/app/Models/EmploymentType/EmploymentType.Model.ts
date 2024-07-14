import { InitialConstants } from '../../Core/Constant/InitialConstant';

export class CreateEmploymentTypeModel{
    name:string= InitialConstants.DefaultString;
    createdById:string = InitialConstants.DefaultString;
}

export class UpdateEmploymentTypeModel{
    id:string= InitialConstants.DefaultString;
    name:string= InitialConstants.DefaultString;
    lastUpdatedById:string = InitialConstants.DefaultString;
}

export class DeleteEmploymentTypeModel{
    id:string= InitialConstants.DefaultString;
    deletedById:string = InitialConstants.DefaultString;
}

export class EmploymentTypeDtoModel{
    id:string= InitialConstants.DefaultString;
    name:string= InitialConstants.DefaultString;
}