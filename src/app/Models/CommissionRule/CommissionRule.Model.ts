import { InitialConstants } from '../../Core/Constant/InitialConstant';

export class CreateCommissionRuleModel{
    name:string= InitialConstants.DefaultString;
    fromKM :number = InitialConstants.DefaultDouble;
    toKM :number = InitialConstants.DefaultDouble;
    value:number=InitialConstants.DefaultDouble;
    haveExtraKM :boolean = InitialConstants.DefaultBool;
    extraKM:number= InitialConstants.DefaultDouble;
    extraValue:number= InitialConstants.DefaultDouble;
    createdById:string = InitialConstants.DefaultString;
}

export class UpdateCommissionRuleModel{
    id:string= InitialConstants.DefaultString;
    name:string= InitialConstants.DefaultString;
    fromKM :number = InitialConstants.DefaultDouble;
    toKM :number = InitialConstants.DefaultDouble;
    value:number=InitialConstants.DefaultDouble;
    haveExtraKM :boolean = InitialConstants.DefaultBool;
    extraKM:number= InitialConstants.DefaultDouble;
    extraValue:number= InitialConstants.DefaultDouble;
    lastUpdatedById:string = InitialConstants.DefaultString;
}

export class DeleteCommissionRuleModel{
    id:string= InitialConstants.DefaultString;
    deletedById:string = InitialConstants.DefaultString;
}

export class CommissionRuleDtoModel{
    id:string= InitialConstants.DefaultString;
    name:string= InitialConstants.DefaultString;
    fromKM :number = InitialConstants.DefaultDouble;
    toKM :number = InitialConstants.DefaultDouble;
    value:number=InitialConstants.DefaultDouble;
    haveExtraKM :boolean = InitialConstants.DefaultBool;
    extraKM:number= InitialConstants.DefaultDouble;
    extraValue:number= InitialConstants.DefaultDouble;
}