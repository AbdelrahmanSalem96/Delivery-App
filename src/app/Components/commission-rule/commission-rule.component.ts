import { Component} from '@angular/core';
import { NgForm } from '@angular/forms';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogbodyComponent } from '../Shared/DialogBody/DialogBody.Component';


import { DataServiceService } from '../../Service/Shared/DataService.Service';

import { BodyMessageEnum } from '../../Enum/Message.Enum';
import { TabsTextEnum,TabsValueEnum } from '../../Enum/Tabs.Enum';
import { DialogReturnValueEnum } from '../../Enum/DialogReturn.Enum';


import { SearchObj } from '../../Core/SearchControls/Common/SearchObj';
import { PagingInfo } from '../../Core/SearchControls/Common/PagingInfo';
import { SearchTypeEnum } from '../../Core/SearchControls/Common/SearchTypeEnum';
import { PagerInfo } from '../../Core/SearchControls/PaggedResultInfo/PagerInfoObj';
import { Criteria } from '../../Core/SearchControls/PaggedCriteriaInfo/CriteriaObj';
import { PaggedResult } from '../../Core/SearchControls/PaggedResultInfo/PaggedResult';
import { PaggedCriteriaSearch } from '../../Core/SearchControls/PaggedCriteriaInfo/PaggedCriteriaSearch';
import { ExpressionCombinationOperatorEnum } from '../../Core/SearchControls/PaggedCriteriaInfo/ExpressionCombinationOperators';


import { HttpStatusCodes } from '../../Core/Constant/HttpStatusCode';
import { InitialConstants } from '../../Core/Constant/InitialConstant';
import { CheckValidation } from '../../Core/Validations/Checkvalidations';

import {CreateCommissionRuleModel,UpdateCommissionRuleModel,DeleteCommissionRuleModel,CommissionRuleDtoModel} from '../../Models/CommissionRule/CommissionRule.Model';

@Component({
  selector: 'app-commission-rule',
  templateUrl: './commission-rule.component.html',
  styleUrl: './commission-rule.component.css'
})
export class CommissionRuleComponent {

  commissionRule:CommissionRuleDtoModel =new CommissionRuleDtoModel();
  createCommissionRule:CreateCommissionRuleModel=new CreateCommissionRuleModel();
  updateCommissionRule:UpdateCommissionRuleModel=new UpdateCommissionRuleModel();
  deleteCommissionRule:DeleteCommissionRuleModel=new DeleteCommissionRuleModel();

 
  isshowbuttonsave:boolean=InitialConstants.DefaultShow;
  isdisabledbutton:boolean=InitialConstants.DefaultOffDisabled;
  extrashow:boolean=InitialConstants.DefaultHidden;

  tabtitle1:TabsTextEnum=TabsTextEnum.Save;
  tabtitle2:TabsTextEnum=TabsTextEnum.Previous;
  tabactive:TabsValueEnum=TabsValueEnum.Save;

  totalpages:number[]=[];
  itemsPerPages:number[]=PagingInfo.ItemsPerPages;
  previousdata:PaggedResult<CommissionRuleDtoModel>=new PaggedResult<CommissionRuleDtoModel>();

  searchObj :SearchObj= new SearchObj();

  namesearchfield:string=InitialConstants.DefaultString;
  fromKMsearchfield:number=InitialConstants.DefaultDouble;
  toKMsearchfield:number=InitialConstants.DefaultDouble;
  valuesearchfield:number=InitialConstants.DefaultDouble;
  searchfieldsfilter:PaggedCriteriaSearch<CommissionRuleDtoModel> = new PaggedCriteriaSearch<CommissionRuleDtoModel>();
  expressionCombinationOperator:ExpressionCombinationOperatorEnum=ExpressionCombinationOperatorEnum.And;

  currentUser:string='8c037a32-68d7-4c38-913e-311ce44fa16e';

  constructor(private _dataServiceService:DataServiceService,private _matDialog: MatDialog) {}

  ngOnInit(): void {
    this.onResetPage(InitialConstants.DefaultShow,TabsValueEnum.Save,TabsTextEnum.Save);
    this.searchfieldsfilter.Criteria=new Criteria();
    this.searchfieldsfilter.SearchObjs=[];
  }

  onSubmit(addForm:NgForm){
    this._dataServiceService.spinnerService.show();
    this.isdisabledbutton=InitialConstants.DefaultOnDisabled;
    if(addForm.valid){

      if(this.commissionRule.name.trim().length == InitialConstants.DefaultInt){
        this._dataServiceService.notificationService.showErrorNotification(BodyMessageEnum.NameIsRequiredMessage);
        this._dataServiceService.spinnerService.hide();
        this.isdisabledbutton=InitialConstants.DefaultOffDisabled;
      }else if(this.commissionRule.fromKM < InitialConstants.DefaultDouble){
        this._dataServiceService.notificationService.showErrorNotification(BodyMessageEnum.FromKMRequiredMessage);
        this._dataServiceService.spinnerService.hide();
        this.isdisabledbutton=InitialConstants.DefaultOffDisabled;
      }else if(this.commissionRule.toKM <= InitialConstants.DefaultDouble){
        this._dataServiceService.notificationService.showErrorNotification(BodyMessageEnum.ToKMIsRequiredMessage);
        this._dataServiceService.spinnerService.hide();
        this.isdisabledbutton=InitialConstants.DefaultOffDisabled;
      }else if(this.commissionRule.value <= InitialConstants.DefaultDouble){
        this._dataServiceService.notificationService.showErrorNotification(BodyMessageEnum.ValueRequiredMessage);
        this._dataServiceService.spinnerService.hide();
        this.isdisabledbutton=InitialConstants.DefaultOffDisabled;
      }else if(this.extrashow == InitialConstants.DefaultShow && this.commissionRule.extraKM == InitialConstants.DefaultDouble){
        this._dataServiceService.notificationService.showErrorNotification(BodyMessageEnum.ExtraKMIsRequiredMessage);
        this._dataServiceService.spinnerService.hide();
        this.isdisabledbutton=InitialConstants.DefaultOffDisabled;
      }else if(this.extrashow == InitialConstants.DefaultShow && this.commissionRule.extraValue == InitialConstants.DefaultDouble){
        this._dataServiceService.notificationService.showErrorNotification(BodyMessageEnum.ExtraValueIsRequiredMessage);
        this._dataServiceService.spinnerService.hide();
        this.isdisabledbutton=InitialConstants.DefaultOffDisabled;
      }else{
        if(this.commissionRule.id != InitialConstants.DefaultString){
          this.updateCommissionRule.id=this.commissionRule.id;
          this.updateCommissionRule.name=this.commissionRule.name;
          this.updateCommissionRule.value=this.commissionRule.value;
          this.updateCommissionRule.fromKM=this.commissionRule.fromKM;
          this.updateCommissionRule.toKM=this.commissionRule.toKM;
          this.updateCommissionRule.haveExtraKM=this.extrashow;
          this.updateCommissionRule.extraKM=this.commissionRule.extraKM;
          this.updateCommissionRule.extraValue=this.commissionRule.extraValue;
          this.updateCommissionRule.lastUpdatedById=this.currentUser;
          this._dataServiceService.commissionRuleService.update(this.updateCommissionRule).subscribe((res)=>{
            this._dataServiceService.spinnerService.hide();
            if(res.statusCode==HttpStatusCodes.OK){
              this._dataServiceService.notificationService.modifiedSuccessfullyNotification();
              this.onResetAddForm(addForm);
            }else{
              this._dataServiceService.notificationService.showErrorNotification(res.message);
              this.isdisabledbutton=InitialConstants.DefaultOffDisabled;
            }
          });
        }else{
          this.createCommissionRule.name=this.commissionRule.name;
          this.createCommissionRule.fromKM=this.commissionRule.fromKM;
          this.createCommissionRule.toKM=this.commissionRule.toKM;
          this.createCommissionRule.value=this.commissionRule.value;
          this.createCommissionRule.haveExtraKM=this.extrashow;
          this.createCommissionRule.extraKM=this.commissionRule.extraKM;
          this.createCommissionRule.extraValue=this.commissionRule.extraValue;          
          this.createCommissionRule.createdById=this.currentUser;
          this._dataServiceService.commissionRuleService.create(this.createCommissionRule).subscribe((res)=>{
            this._dataServiceService.spinnerService.hide();
            if(res.statusCode==HttpStatusCodes.OK){
              this._dataServiceService.notificationService.addedSuccessfullyNotification();
              this.onResetAddForm(addForm);
            }else{
              this._dataServiceService.notificationService.showErrorNotification(res.message);
              this.isdisabledbutton=InitialConstants.DefaultOffDisabled;
            }
          });
        }
      }
    }else{
      this._dataServiceService.spinnerService.hide();
      this._dataServiceService.notificationService.invalidDataNotification()
      this.isdisabledbutton=InitialConstants.DefaultOffDisabled;
    }
  }

  onEdit(id:string){
    this._dataServiceService.spinnerService.show();
    this._dataServiceService.commissionRuleService.getById(id).subscribe(res => {
      this._dataServiceService.spinnerService.hide();
      if(res.statusCode==HttpStatusCodes.OK){
        this.onResetPage(InitialConstants.DefaultHidden,TabsValueEnum.Save,TabsTextEnum.Edit);
        this.commissionRule=res.data ?? new CommissionRuleDtoModel();
        this.extrashow=this.commissionRule.haveExtraKM;
      }else if(res.statusCode==HttpStatusCodes.NotFound){
        this._dataServiceService.notificationService.showErrorNotification(res.message);
        if(this.previousdata.items.length == InitialConstants.DefaultLength && this.previousdata.pagerInfo.currentPage > InitialConstants.DefaultFirstPage){
          this.previousdata.pagerInfo.currentPage =  this.previousdata.pagerInfo.currentPage - InitialConstants.DefaultLength;
        }else if(this.previousdata.items.length == InitialConstants.DefaultLength && this.previousdata.pagerInfo.currentPage == InitialConstants.DefaultFirstPage && this.previousdata.pagerInfo.totalNumberOfPages == InitialConstants.DefaultLength){
          this.previousdata.pagerInfo=new PagerInfo();
        }
        this.onResetPage(InitialConstants.DefaultShow,TabsValueEnum.Previous,TabsTextEnum.Save);
        this.onLoadPageSearch();
      }else{
        this._dataServiceService.notificationService.showErrorNotification(res.message);
      }
    });
  }

  onDelete(id:string){
    this._dataServiceService.spinnerService.show();
    this.deleteCommissionRule.id=id;
    this.deleteCommissionRule.deletedById=this.currentUser;
    this._dataServiceService.commissionRuleService.delete(this.deleteCommissionRule).subscribe((res)=>{
      this._dataServiceService.spinnerService.hide();
      if(res.statusCode==HttpStatusCodes.OK){
        this._dataServiceService.notificationService.deletedSuccessfullyNotification();
        if(this.previousdata.items.length == InitialConstants.DefaultLength && this.previousdata.pagerInfo.currentPage > InitialConstants.DefaultFirstPage){
          this.previousdata.pagerInfo.currentPage =  this.previousdata.pagerInfo.currentPage - InitialConstants.DefaultLength;
        }else if(this.previousdata.items.length == InitialConstants.DefaultLength && this.previousdata.pagerInfo.currentPage == InitialConstants.DefaultFirstPage && this.previousdata.pagerInfo.totalNumberOfPages == InitialConstants.DefaultLength){
          this.previousdata.pagerInfo=new PagerInfo();
        }
        this.onResetPage(InitialConstants.DefaultShow,TabsValueEnum.Previous,TabsTextEnum.Save);
        this.onLoadPageSearch();
      }else if(res.statusCode==HttpStatusCodes.NotFound){
        this._dataServiceService.notificationService.showErrorNotification(res.message);
        if(this.previousdata.items.length == InitialConstants.DefaultLength && this.previousdata.pagerInfo.currentPage > InitialConstants.DefaultFirstPage){
          this.previousdata.pagerInfo.currentPage =  this.previousdata.pagerInfo.currentPage - InitialConstants.DefaultLength;
        }else if(this.previousdata.items.length == InitialConstants.DefaultLength && this.previousdata.pagerInfo.currentPage == InitialConstants.DefaultFirstPage && this.previousdata.pagerInfo.totalNumberOfPages == InitialConstants.DefaultLength){
          this.previousdata.pagerInfo=new PagerInfo();
        }
        this.onResetPage(InitialConstants.DefaultShow,TabsValueEnum.Previous,TabsTextEnum.Save);
        this.onLoadPageSearch();
      }else{
        this._dataServiceService.notificationService.showErrorNotification(res.message);
        this.onResetPage(InitialConstants.DefaultShow,TabsValueEnum.Previous,TabsTextEnum.Save);
      }
    });
  }

  onOpenDialog(id:string,name:string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {message:"Do You Want To Delete Commission Rule "+ name + " ? "};
    dialogConfig.width = InitialConstants.DefaultDialogWidth;
    dialogConfig.enterAnimationDuration=InitialConstants.DefaultEnterAnimationDuration;
    dialogConfig.exitAnimationDuration=InitialConstants.DefaultExitAnimationDuration;
    let dialogRef = this._matDialog.open(DialogbodyComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data) =>{
      if(data==DialogReturnValueEnum.Yes){
        this.onDelete(id);
      }else {}
    });
  }

  onResetPage(btn:boolean=InitialConstants.DefaultShow,tabactive:TabsValueEnum=TabsValueEnum.Save,tabname:TabsTextEnum=TabsTextEnum.Save){
    this.commissionRule=new CommissionRuleDtoModel();
    this.createCommissionRule=new CreateCommissionRuleModel();
    this.updateCommissionRule=new UpdateCommissionRuleModel();
    this.deleteCommissionRule=new DeleteCommissionRuleModel();
    this.isshowbuttonsave=btn;
    this.tabactive=tabactive;
    this.tabtitle1=tabname;
    this.isdisabledbutton=InitialConstants.DefaultOffDisabled;
    this.extrashow=InitialConstants.DefaultHidden;
  }

  onResetAddForm(addForm:NgForm){
    addForm.reset();
    this.onResetPage(InitialConstants.DefaultShow,TabsValueEnum.Save,TabsTextEnum.Save);
  }

  onSearch(){

    this.searchfieldsfilter.SearchObjs=[];
    this.searchfieldsfilter.Criteria.currentPage=InitialConstants.DefaultCurrentPage;
    this.searchfieldsfilter.Criteria.pageSize=InitialConstants.DefaultPageSize;
    this.searchfieldsfilter.Criteria.expressionCombinationOperator=this.expressionCombinationOperator;

    if(CheckValidation.CheckStringNotEmpty(this.namesearchfield)){
      this.searchObj=new SearchObj();
      this.searchObj.Name="Name";
      this.searchObj.Value=this.namesearchfield;
      this.searchObj.Type=SearchTypeEnum.Text;
      this.searchfieldsfilter.SearchObjs.push(this.searchObj);
    }

    if(this.fromKMsearchfield > InitialConstants.DefaultDouble){
      this.searchObj=new SearchObj();
      this.searchObj.Name="FromKM";
      this.searchObj.Value=this.fromKMsearchfield.toString();
      this.searchObj.Type=SearchTypeEnum.Double;
      this.searchfieldsfilter.SearchObjs.push(this.searchObj);
    }

    if(this.toKMsearchfield > InitialConstants.DefaultDouble){
      this.searchObj=new SearchObj();
      this.searchObj.Name="ToKM";
      this.searchObj.Value=this.toKMsearchfield.toString();
      this.searchObj.Type=SearchTypeEnum.Double;
      this.searchfieldsfilter.SearchObjs.push(this.searchObj);
    }

    if(this.valuesearchfield > InitialConstants.DefaultDouble){
      this.searchObj=new SearchObj();
      this.searchObj.Name="Value";
      this.searchObj.Value=this.valuesearchfield.toString();
      this.searchObj.Type=SearchTypeEnum.Double;
      this.searchfieldsfilter.SearchObjs.push(this.searchObj);
    }

    this.onLoadPageSearch();
  }

  onResetSearchForm(){
    this.namesearchfield=InitialConstants.DefaultString;
    this.fromKMsearchfield=InitialConstants.DefaultDouble;
    this.toKMsearchfield=InitialConstants.DefaultDouble;
    this.valuesearchfield=InitialConstants.DefaultDouble;
    this.expressionCombinationOperator=ExpressionCombinationOperatorEnum.And;
  }

  onPageChanged(page:string){
    this.searchfieldsfilter.Criteria.currentPage = Number(page);
    this.onLoadPageSearch();
  }

  onItemsPerPageChange(pageSize:string){
    this.searchfieldsfilter.Criteria.pageSize = Number(pageSize);
    this.searchfieldsfilter.Criteria.currentPage = InitialConstants.DefaultCurrentPage;
    this.onLoadPageSearch();
  }

  onLoadPageSearch(){
    console.log(this.searchfieldsfilter);
    this._dataServiceService.spinnerService.show();
    this._dataServiceService.commissionRuleService.getPaggedResult(this.searchfieldsfilter).subscribe((res)=>{
      this._dataServiceService.spinnerService.hide();
      console.log(res);
      if(res.statusCode == HttpStatusCodes.OK){
        this.previousdata=res.data ?? new PaggedResult<CommissionRuleDtoModel>();
        this.totalpages=PagingInfo.GetTotalPages(res.data?.pagerInfo.totalNumberOfPages ?? InitialConstants.DefaultNoPages);
      }else if (res.statusCode == HttpStatusCodes.NotFound){
        this.previousdata=new PaggedResult<CommissionRuleDtoModel>();
        this.totalpages=[];
      }else{
        this._dataServiceService.notificationService.showErrorNotification(res.message);
        this.previousdata=new PaggedResult<CommissionRuleDtoModel>();
        this.totalpages=[];
      }
    });
  }
  
}
