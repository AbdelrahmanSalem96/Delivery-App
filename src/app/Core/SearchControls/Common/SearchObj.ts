import { SearchTypeEnum } from "./SearchTypeEnum";
import { InitialConstants } from "../../Constant/InitialConstant";

export class SearchObj{
  Name:string=InitialConstants.DefaultString;
  Value:string=InitialConstants.DefaultString;
  Type:SearchTypeEnum=SearchTypeEnum.Text;
}
