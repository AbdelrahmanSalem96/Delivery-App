import { Component, OnInit } from '@angular/core';
import { CaptinDtoModel } from '../../../../Models/Captin/Captin.Model';
import { PaggedCriteriaSearch } from '../../../../Core/SearchControls/PaggedCriteriaInfo/PaggedCriteriaSearch';
import { Criteria } from '../../../../Core/SearchControls/PaggedCriteriaInfo/CriteriaObj';
import { InitialConstants } from '../../../../Core/Constant/InitialConstant';
import { ExpressionCombinationOperatorEnum } from '../../../../Core/SearchControls/PaggedCriteriaInfo/ExpressionCombinationOperators';
import { SearchObj } from '../../../../Core/SearchControls/Common/SearchObj';
import { DataServiceService } from '../../../../Service/Shared/DataService.Service';
import { CheckValidation } from '../../../../Core/Validations/Checkvalidations';
import { SearchTypeEnum } from '../../../../Core/SearchControls/Common/SearchTypeEnum';
import { HttpStatusCodes } from '../../../../Core/Constant/HttpStatusCode';
import { PaggedResult } from '../../../../Core/SearchControls/PaggedResultInfo/PaggedResult';
import { PagingInfo } from '../../../../Core/SearchControls/Common/PagingInfo';

@Component({
  selector: 'app-client-branch-search',
  templateUrl: './client-branch-search.component.html',
  styleUrl: './client-branch-search.component.css'
})
export class ClientBranchSearchComponent implements OnInit{

  totalpages:number[]=[];
  itemsPerPages:number[]=PagingInfo.ItemsPerPages;
  previousdata:PaggedResult<CaptinDtoModel>=new PaggedResult<CaptinDtoModel>();

  searchObj :SearchObj= new SearchObj();
  namesearchfield:string=InitialConstants.DefaultString;
  searchfieldsfilter:PaggedCriteriaSearch<CaptinDtoModel> = new PaggedCriteriaSearch<CaptinDtoModel>();
  expressionCombinationOperator:ExpressionCombinationOperatorEnum=ExpressionCombinationOperatorEnum.And;

  constructor(private _dataServiceService:DataServiceService) {}

  ngOnInit(): void{
    this.searchfieldsfilter.Criteria=new Criteria();
    this.searchfieldsfilter.SearchObjs=[];
  }

  onSearch(){

    this.searchfieldsfilter.SearchObjs=[];
    this.searchfieldsfilter.Criteria.currentPage=InitialConstants.DefaultCurrentPage;
    this.searchfieldsfilter.Criteria.pageSize=InitialConstants.DefaultPageSize;
    this.searchfieldsfilter.Criteria.expressionCombinationOperator=this.expressionCombinationOperator;

    if(CheckValidation.CheckStringNotEmpty(this.namesearchfield)){
      this.searchObj.Name="Name";
      this.searchObj.Value=this.namesearchfield;
      this.searchObj.Type=SearchTypeEnum.Text;
      this.searchfieldsfilter.SearchObjs.push(this.searchObj);
    }

    this.onLoadPageSearch();
  }

  onResetSearchForm(){
    this.namesearchfield=InitialConstants.DefaultString;
    this.expressionCombinationOperator=ExpressionCombinationOperatorEnum.And;
  }

  onLoadPageSearch(){
    this._dataServiceService.spinnerService.show();
    this._dataServiceService.bankService.getPaggedResult(this.searchfieldsfilter).subscribe((res)=>{
      this._dataServiceService.spinnerService.hide();
      if(res.statusCode == HttpStatusCodes.OK){
        this.previousdata=res.data ?? new PaggedResult<CaptinDtoModel>();
        this.totalpages=PagingInfo.GetTotalPages(res.data?.pagerInfo.totalNumberOfPages ?? InitialConstants.DefaultNoPages);
      }else{
        this._dataServiceService.notificationService.showErrorNotification(res.message);
        this.previousdata=new PaggedResult<CaptinDtoModel>();
        this.totalpages=[];
      }
    });
  }
}
