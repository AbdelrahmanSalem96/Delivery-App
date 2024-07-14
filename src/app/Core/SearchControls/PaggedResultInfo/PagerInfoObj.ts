import {InitialConstants} from  '../../Constant/InitialConstant';

export class PagerInfo{
  currentPage:number=InitialConstants.DefaultCurrentPage;
  pageSize:number=InitialConstants.DefaultPageSize;
  totalNumberOfPages:number=InitialConstants.DefaultTotalNumberOfPages;
  totalNumberOfItems:number=InitialConstants.DefaultTotalNumberOfItems;
  firstPage:number=InitialConstants.DefaultFirstPage;
  lastPage:number=InitialConstants.DefaultFirstPage;
  hasPreviousPage : Boolean=false;
  hasNextPage : Boolean=false;
}
