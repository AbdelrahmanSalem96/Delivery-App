import { HttpStatusCodes } from '../../Constant/HttpStatusCode';
import { InitialConstants } from '../../Constant/InitialConstant';

export class ResponseObj{
  statusCode:number = HttpStatusCodes.OK;
  message:string = InitialConstants.DefaultSuccessMessage;
}
