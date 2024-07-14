import { InitialConstants } from "../../Core/Constant/InitialConstant";

export class CreateEmployeeModel{
  name:string= InitialConstants.DefaultString;;
  email:string= InitialConstants.DefaultString;;
  phoneNumber:string= InitialConstants.DefaultString;
  password:string= InitialConstants.DefaultString;
  role:string= InitialConstants.DefaultString;
  createdById:string = InitialConstants.DefaultString;
}

export class UpdateEmployeeModel{
  id:string= InitialConstants.DefaultString;
  name:string= InitialConstants.DefaultString;;
  email:string= InitialConstants.DefaultString;;
  phoneNumber:string= InitialConstants.DefaultString;
  password:string= InitialConstants.DefaultString;
  role:string= InitialConstants.DefaultString;
  lastUpdatedById:string = InitialConstants.DefaultString;
}

export class DeleteEmployeeModel{
  id:string= InitialConstants.DefaultString;
  deletedById:string = InitialConstants.DefaultString;
}

export class EmployeeDtoModel{
  id:string= InitialConstants.DefaultString;;
  name:string= InitialConstants.DefaultString;;
  email:string= InitialConstants.DefaultString;;
  phoneNumber:string= InitialConstants.DefaultString;
  password:string= InitialConstants.DefaultString;
  role:string= InitialConstants.DefaultString;
}

export class EmployeeModel{
  id:string= InitialConstants.DefaultString;;
  name:string= InitialConstants.DefaultString;;
  email:string= InitialConstants.DefaultString;;
  mobile:number= InitialConstants.DefaultInt;
  role:string= InitialConstants.DefaultString;;
  password:string= InitialConstants.DefaultString;;
}