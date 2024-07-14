import {InitialConstants} from  '../../Constant/InitialConstant';
import {ExpressionCombinationOperatorEnum} from './ExpressionCombinationOperators'

export class Criteria{
  currentPage:number=InitialConstants.DefaultCurrentPage;
  pageSize:number=InitialConstants.DefaultPageSize;
  expressionCombinationOperator:ExpressionCombinationOperatorEnum=ExpressionCombinationOperatorEnum.And
}
