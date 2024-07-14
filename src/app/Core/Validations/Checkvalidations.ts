import {InitialConstants} from '../Constant/InitialConstant'

export abstract class CheckValidation {

  public static CheckStringNotEmpty(value : string): boolean {
    if(value == null || value == InitialConstants.DefaultString || value.trim().length == InitialConstants.DefaultCount) return false;
    return true;
  }

  public static CheckSendDate(value : Date): boolean {
    if(value == null || (value.getFullYear() == InitialConstants.DefaultYear && value.getMonth() == InitialConstants.DefaultMonth && value.getDay() == InitialConstants.DefaultDay)) return false;
    return true;
  }
}
