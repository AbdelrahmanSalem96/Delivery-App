import { Criteria } from "./CriteriaObj";
import { SearchObj } from "../Common/SearchObj";

export class PaggedCriteriaSearch<TEntity>  {
  public SearchObjs:SearchObj[]=[];
  public Criteria:Criteria=new Criteria();
}
