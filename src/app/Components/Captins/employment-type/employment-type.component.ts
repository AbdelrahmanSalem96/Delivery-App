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

import {CreateEmploymentTypeModel,UpdateEmploymentTypeModel,DeleteEmploymentTypeModel,EmploymentTypeDtoModel} from '../../../Models/EmploymentType/EmploymentType.Model';

@Component({
  selector: 'app-employment-type',
  templateUrl: './employment-type.component.html',
  styleUrl: './employment-type.component.css'
})
export class EmploymentTypeComponent {

  employmentType:EmploymentTypeDtoModel =new EmploymentTypeDtoModel();
  createEmploymentType:CreateEmploymentTypeModel=new CreateEmploymentTypeModel();
  updateEmploymentType:UpdateEmploymentTypeModel=new UpdateEmploymentTypeModel();
  deleteEmploymentType:DeleteEmploymentTypeModel=new DeleteEmploymentTypeModel();

 
  isshowbuttonsave:boolean=InitialConstants.DefaultShow;
  isdisabledbutton:boolean=InitialConstants.DefaultOffDisabled;

  tabtitle1:TabsTextEnum=TabsTextEnum.Save;
  tabtitle2:TabsTextEnum=TabsTextEnum.Previous;
  tabactive:TabsValueEnum=TabsValueEnum.Save;

  totalpages:number[]=[];
  itemsPerPages:number[]=PagingInfo.ItemsPerPages;
  previousdata:PaggedResult<EmploymentTypeDtoModel>=new PaggedResult<EmploymentTypeDtoModel>();

  searchObj :SearchObj= new SearchObj();
  namesearchfield:string=InitialConstants.DefaultString;
  searchfieldsfilter:PaggedCriteriaSearch<EmploymentTypeDtoModel> = new PaggedCriteriaSearch<EmploymentTypeDtoModel>();
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
      if(this.employmentType.name.trim().length == InitialConstants.DefaultInt){
        this._dataServiceService.notificationService.showErrorNotification(BodyMessageEnum.NameIsRequiredMessage);
        this._dataServiceService.spinnerService.hide();
        this.isdisabledbutton=InitialConstants.DefaultOffDisabled;
      }else{
        if(this.employmentType.id != InitialConstants.DefaultString){
          this.updateEmploymentType.id=this.employmentType.id;
          this.updateEmploymentType.name=this.employmentType.name;
          this.updateEmploymentType.lastUpdatedById=this.currentUser;
          this._dataServiceService.employmentTypeService.update(this.updateEmploymentType).subscribe((res)=>{
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
          this.createEmploymentType.name=this.employmentType.name;
          this.createEmploymentType.createdById=this.currentUser;
          this._dataServiceService.employmentTypeService.create(this.createEmploymentType).subscribe((res)=>{
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
    this._dataServiceService.employmentTypeService.getById(id).subscribe(res => {
      this._dataServiceService.spinnerService.hide();
      if(res.statusCode==HttpStatusCodes.OK){
        this.onResetPage(InitialConstants.DefaultHidden,TabsValueEnum.Save,TabsTextEnum.Edit);
        this.employmentType=res.data ?? new EmploymentTypeDtoModel();
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
    this.deleteEmploymentType.id=id;
    this.deleteEmploymentType.deletedById=this.currentUser;
    this._dataServiceService.employmentTypeService.delete(this.deleteEmploymentType).subscribe((res)=>{
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
          this.previousdata=new PaggedResult<EmploymentTypeDtoModel>();
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
    dialogConfig.data = {message:"Do You Want To Delete Employment Type "+ name + " ? "};
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
    this.employmentType=new EmploymentTypeDtoModel();
    this.createEmploymentType=new CreateEmploymentTypeModel();
    this.updateEmploymentType=new UpdateEmploymentTypeModel();
    this.deleteEmploymentType=new DeleteEmploymentTypeModel();
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
    this._dataServiceService.employmentTypeService.getPaggedResult(this.searchfieldsfilter).subscribe((res)=>{
      this._dataServiceService.spinnerService.hide();
      if(res.statusCode == HttpStatusCodes.OK){
        this.previousdata=res.data ?? new PaggedResult<EmploymentTypeDtoModel>();
        this.totalpages=PagingInfo.GetTotalPages(res.data?.pagerInfo.totalNumberOfPages ?? InitialConstants.DefaultNoPages);
      }else if (res.statusCode == HttpStatusCodes.NotFound){
        this.previousdata=new PaggedResult<EmploymentTypeDtoModel>();
        this.totalpages=[];
      }else{
        this._dataServiceService.notificationService.showErrorNotification(res.message);
        this.previousdata=new PaggedResult<EmploymentTypeDtoModel>();
        this.totalpages=[];
      }
    });
  }
  
}
