import { InitialConstants } from '../../Core/Constant/InitialConstant';

export class CreateCaptinEarningTimeModel{
    startDate:Date= new Date();
    endDate:Date= new Date();
    createdById:string = InitialConstants.DefaultString;
}

export class UpdateCaptinEarningTimeModel{
    id:string= InitialConstants.DefaultString;
    startDate:Date= new Date();
    endDate:Date= new Date();
    lastUpdatedById:string = InitialConstants.DefaultString;
}

export class DeleteCaptinEarningTimeModel{
    id:string= InitialConstants.DefaultString;
    deletedById:string = InitialConstants.DefaultString;
}

export class CaptinEarningTimeDtoModel{
    id:string= InitialConstants.DefaultString;    
    startDate:Date= new Date();
    endDate:Date= new Date();
}