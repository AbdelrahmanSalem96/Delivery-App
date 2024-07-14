import { Component} from '@angular/core';
import { NgForm } from '@angular/forms';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogbodyComponent } from '../../Shared/DialogBody/DialogBody.Component';


import { DataServiceService } from '../../../Service/Shared/DataService.Service';

import { BodyMessageEnum } from '../../../Enum/Message.Enum';
import { TabsTextEnum,TabsValueEnum } from '../../../Enum/Tabs.Enum';
import { DialogReturnValueEnum } from '../../../Enum/DialogReturn.Enum';


import { SearchObj } from '../../../Core/SearchControls/Common/SearchObj';
import { PagingInfo } from './../../../Core/SearchControls/Common/PagingInfo';
import { SearchTypeEnum } from '../../../Core/SearchControls/Common/SearchTypeEnum';
import { PagerInfo } from '../../../Core/SearchControls/PaggedResultInfo/PagerInfoObj';
import { Criteria } from '../../../Core/SearchControls/PaggedCriteriaInfo/CriteriaObj';
import { PaggedResult } from '../../../Core/SearchControls/PaggedResultInfo/PaggedResult';
import { PaggedCriteriaSearch } from '../../../Core/SearchControls/PaggedCriteriaInfo/PaggedCriteriaSearch';
import { ExpressionCombinationOperatorEnum } from '../../../Core/SearchControls/PaggedCriteriaInfo/ExpressionCombinationOperators';


import { HttpStatusCodes } from '../../../Core/Constant/HttpStatusCode';
import { InitialConstants } from '../../../Core/Constant/InitialConstant';
import { CheckValidation } from '../../../Core/Validations/Checkvalidations';

import {CreateActivationStateModel,UpdateActivationStateModel,DeleteActivationStateModel,ActivationStateDtoModel} from '../../../Models/ActivationState/ActivationState.Model';

@Component({
  selector: 'app-activation-state',
  templateUrl: './activation-state.component.html',
  styleUrl: './activation-state.component.css'
})
export class ActivationStateComponent {
 
  activationState:ActivationStateDtoModel =new ActivationStateDtoModel();
  createActivationState:CreateActivationStateModel=new CreateActivationStateModel();
  updateActivationState:UpdateActivationStateModel=new UpdateActivationStateModel();
  deleteActivationState:DeleteActivationStateModel=new DeleteActivationStateModel();

 
  isshowbuttonsave:boolean=InitialConstants.DefaultShow;
  isdisabledbutton:boolean=InitialConstants.DefaultOffDisabled;

  tabtitle1:TabsTextEnum=TabsTextEnum.Save;
  tabtitle2:TabsTextEnum=TabsTextEnum.Previous;
  tabactive:TabsValueEnum=TabsValueEnum.Save;

  totalpages:number[]=[];
  itemsPerPages:number[]=PagingInfo.ItemsPerPages;
  previousdata:PaggedResult<ActivationStateDtoModel>=new PaggedResult<ActivationStateDtoModel>();

  searchObj :SearchObj= new SearchObj();
  namesearchfield:string=InitialConstants.DefaultString;
  searchfieldsfilter:PaggedCriteriaSearch<ActivationStateDtoModel> = new PaggedCriteriaSearch<ActivationStateDtoModel>();
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
      if(this.activationState.name.trim().length == InitialConstants.DefaultInt){
        this._dataServiceService.notificationService.showErrorNotification(BodyMessageEnum.NameIsRequiredMessage);
        this._dataServiceService.spinnerService.hide();
        this.isdisabledbutton=InitialConstants.DefaultOffDisabled;
      }else{
        if(this.activationState.id != InitialConstants.DefaultString){
          this.updateActivationState.id=this.activationState.id;
          this.updateActivationState.name=this.activationState.name;
          this.updateActivationState.lastUpdatedById=this.currentUser;
          this._dataServiceService.activationStateService.update(this.updateActivationState).subscribe((res)=>{
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
          this.createActivationState.name=this.activationState.name;
          this.createActivationState.createdById=this.currentUser;
          this._dataServiceService.activationStateService.create(this.createActivationState).subscribe((res)=>{
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
    this._dataServiceService.activationStateService.getById(id).subscribe(res => {
      this._dataServiceService.spinnerService.hide();
      if(res.statusCode==HttpStatusCodes.OK){
        this.onResetPage(InitialConstants.DefaultHidden,TabsValueEnum.Save,TabsTextEnum.Edit);
        this.activationState=res.data ?? new ActivationStateDtoModel();
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
    this.deleteActivationState.id=id;
    this.deleteActivationState.deletedById=this.currentUser;
    this._dataServiceService.activationStateService.delete(this.deleteActivationState).subscribe((res)=>{
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
    dialogConfig.data = {message:"Do You Want To Delete Activation State "+ name + " ? "};
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
    this.activationState=new ActivationStateDtoModel();
    this.createActivationState=new CreateActivationStateModel();
    this.updateActivationState=new UpdateActivationStateModel();
    this.deleteActivationState=new DeleteActivationStateModel();
    this.isshowbuttonsave=btn;
    this.tabactive=tabactive;
    this.tabtitle1=tabname;
    this.isdisabledbutton=InitialConstants.DefaultOffDisabled;
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
    this._dataServiceService.spinnerService.show();
    this._dataServiceService.activationStateService.getPaggedResult(this.searchfieldsfilter).subscribe((res)=>{
      this._dataServiceService.spinnerService.hide();
      if(res.statusCode == HttpStatusCodes.OK){
        this.previousdata=res.data ?? new PaggedResult<ActivationStateDtoModel>();
        this.totalpages=PagingInfo.GetTotalPages(res.data?.pagerInfo.totalNumberOfPages ?? InitialConstants.DefaultNoPages);
      }else if (res.statusCode == HttpStatusCodes.NotFound){
        this.previousdata=new PaggedResult<ActivationStateDtoModel>();
        this.totalpages=[];
      }else{
        this._dataServiceService.notificationService.showErrorNotification(res.message);
        this.previousdata=new PaggedResult<ActivationStateDtoModel>();
        this.totalpages=[];
      }
    });
  }
  
}
