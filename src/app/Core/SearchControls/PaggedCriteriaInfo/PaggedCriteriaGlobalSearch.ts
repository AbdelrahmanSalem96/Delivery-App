import { Criteria } from "./CriteriaObj";

export class PaggedCriteriaGlobalSearch<TEntity>  {
  public searchObj:TEntity | null= null;
  public criteria:Criteria=new Criteria();
}
