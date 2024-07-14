import { PagerInfo } from "./PagerInfoObj";

export class PaggedResult<TEntity>  {
  items:TEntity[]=[];
  pagerInfo:PagerInfo=new PagerInfo();
}
