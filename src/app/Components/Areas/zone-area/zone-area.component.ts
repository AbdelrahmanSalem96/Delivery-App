import { Component} from '@angular/core';
import { NgForm } from '@angular/forms';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogbodyComponent } from '../../Shared/DialogBody/DialogBody.Component';


import { DataServiceService } from '../../../Service/Shared/DataService.Service';

import { BodyMessageEnum } from '../../../Enum/Message.Enum';
import { TabsTextEnum,TabsValueEnum } from '../../../Enum/Tabs.Enum';
import { AreaStateEnum, AreaTypeEnum } from '../../../Enum/Area.Enum';
import { DialogReturnValueEnum } from '../../../Enum/DialogReturn.Enum';


import { SearchObj } from '../../../Core/SearchControls/Common/SearchObj';
import { PagingInfo } from './../../../Core/SearchControls/Common/PagingInfo';
import { SearchTypeEnum } from '../../../Core/SearchControls/Common/SearchTypeEnum';
import { PagerInfo } from '../../../Core/SearchControls/PaggedResultInfo/PagerInfoObj';
import { Criteria } from '../../../Core/SearchControls/PaggedCriteriaInfo/CriteriaObj';
import { PaggedResult } from '../../../Core/SearchControls/PaggedResultInfo/PaggedResult';
import { CriteriaSearch } from '../../../Core/SearchControls/PaggedCriteriaInfo/CriteriaSearch';
import { PaggedCriteriaSearch } from '../../../Core/SearchControls/PaggedCriteriaInfo/PaggedCriteriaSearch';
import { ExpressionCombinationOperatorEnum } from '../../../Core/SearchControls/PaggedCriteriaInfo/ExpressionCombinationOperators';


import { HttpStatusCodes } from '../../../Core/Constant/HttpStatusCode';
import { InitialConstants } from '../../../Core/Constant/InitialConstant';
import { CheckValidation } from '../../../Core/Validations/Checkvalidations';

import { KeyValuePairModel } from '../../../Models/Shared/KeyValuePair.Model';
import {CreateAreaModel,UpdateAreaModel,DeleteAreaModel,AreaDtoModel} from '../../../Models/Area/Area.Model';

@Component({
  selector: 'app-zone-area',
  templateUrl: './zone-area.component.html',
  styleUrl: './zone-area.component.css'
})
export class ZoneAreaComponent {

  areasLite:KeyValuePairModel[] =[];
  area:AreaDtoModel =new AreaDtoModel();

  createArea:CreateAreaModel=new CreateAreaModel();
  updateArea:UpdateAreaModel=new UpdateAreaModel();
  deleteArea:DeleteAreaModel=new DeleteAreaModel();

 
  isshowbuttonsave:boolean=InitialConstants.DefaultShow;
  isdisabledbutton:boolean=InitialConstants.DefaultOffDisabled;

  tabtitle1:TabsTextEnum=TabsTextEnum.Save;
  tabtitle2:TabsTextEnum=TabsTextEnum.Previous;
  tabactive:TabsValueEnum=TabsValueEnum.Save;

  totalpages:number[]=[];
  itemsPerPages:number[]=PagingInfo.ItemsPerPages;
  previousdata:PaggedResult<AreaDtoModel>=new PaggedResult<AreaDtoModel>();

  searchObj :SearchObj= new SearchObj();
  namesearchfield:string=InitialConstants.DefaultString;
  areaidsearchfield:string=InitialConstants.DefaultSelectedDropDownListString;

  searchfieldsfilter:PaggedCriteriaSearch<AreaDtoModel> = new PaggedCriteriaSearch<AreaDtoModel>();
  expressionCombinationOperator:ExpressionCombinationOperatorEnum=ExpressionCombinationOperatorEnum.And;

  currentUser:string='8c037a32-68d7-4c38-913e-311ce44fa16e';

  constructor(private _dataServiceService:DataServiceService,private _matDialog: MatDialog) {}

  ngOnInit(): void {
    this.onResetPage(InitialConstants.DefaultShow,TabsValueEnum.Save,TabsTextEnum.Save);
    this.searchfieldsfilter.Criteria=new Criteria();
    this.searchfieldsfilter.SearchObjs=[];


    let searchAreafilter :CriteriaSearch<AreaDtoModel> = new CriteriaSearch<AreaDtoModel>();
    let searchAreaObjs :SearchObj =new SearchObj();
    searchAreaObjs.Name="AreaType";
    searchAreaObjs.Type=SearchTypeEnum.Enum;
    searchAreaObjs.Value=AreaTypeEnum.Area.toString();
    searchAreafilter.searchObjs.push(searchAreaObjs);
    this._dataServiceService.areaService.getLite(searchAreafilter).subscribe(res=>{
      this.areasLite=res.data;
    });
  }

  onSubmit(addForm:NgForm){
    this._dataServiceService.spinnerService.show();
    this.isdisabledbutton=InitialConstants.DefaultOnDisabled;
    if(addForm.valid){
      if(this.area.name.trim().length == InitialConstants.DefaultInt){
        this._dataServiceService.notificationService.showErrorNotification(BodyMessageEnum.NameIsRequiredMessage);
        this._dataServiceService.spinnerService.hide();
        this.isdisabledbutton=InitialConstants.DefaultOffDisabled;
      }else if(this.area.parentId == InitialConstants.DefaultString || this.area.parentId == InitialConstants.DefaultSelectedDropDownListString){
        this._dataServiceService.notificationService.showErrorNotification(BodyMessageEnum.AreaIsRequiredMessage);
        this._dataServiceService.spinnerService.hide();
        this.isdisabledbutton=InitialConstants.DefaultOffDisabled;
      }else{
        if(this.area.id != InitialConstants.DefaultString){
          this.updateArea.id=this.area.id;
          this.updateArea.name=this.area.name;
          this.updateArea.description=this.area.description;
          this.updateArea.areaState=this.area.areaState;
          this.updateArea.areaType=this.area.areaType;
          this.updateArea.parentId=this.area.parentId;
          this.updateArea.lastUpdatedById=this.currentUser;
          this._dataServiceService.areaService.update(this.updateArea).subscribe((res)=>{
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
          this.createArea.name=this.area.name;
          this.createArea.description=this.area.description;
          this.createArea.areaState=AreaStateEnum.Active;
          this.createArea.areaType=AreaTypeEnum.Zone;
          this.createArea.parentId=this.area.parentId;
          this.createArea.createdById=this.currentUser;
          this._dataServiceService.areaService.create(this.createArea).subscribe((res)=>{
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
    this._dataServiceService.areaService.getById(id).subscribe(res => {
      this._dataServiceService.spinnerService.hide();
      if(res.statusCode==HttpStatusCodes.OK){
        this.onResetPage(InitialConstants.DefaultHidden,TabsValueEnum.Save,TabsTextEnum.Edit);
        this.area=res.data ?? new AreaDtoModel();
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
    this.deleteArea.id=id;
    this.deleteArea.deletedById=this.currentUser;
    this._dataServiceService.areaService.delete(this.deleteArea).subscribe((res)=>{
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
    dialogConfig.data = {message:"Do You Want To Delete Zone "+ name + " ? "};
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
    this.area=new AreaDtoModel();
    this.createArea=new CreateAreaModel();
    this.updateArea=new UpdateAreaModel();
    this.deleteArea=new DeleteAreaModel();
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

    this.searchObj=new SearchObj();
    this.searchObj.Name="AreaType";
    this.searchObj.Value=AreaTypeEnum.Zone.toString();
    this.searchObj.Type=SearchTypeEnum.Enum;
    this.searchfieldsfilter.SearchObjs.push(this.searchObj);

    if(CheckValidation.CheckStringNotEmpty(this.namesearchfield)){
      this.searchObj=new SearchObj();
      this.searchObj.Name="Name";
      this.searchObj.Value=this.namesearchfield;
      this.searchObj.Type=SearchTypeEnum.Text;
      this.searchfieldsfilter.SearchObjs.push(this.searchObj);
    }

    if(this.areaidsearchfield != InitialConstants.DefaultSelectedDropDownListString){
      this.searchObj=new SearchObj();
      this.searchObj.Name="ParentId";
      this.searchObj.Value=this.areaidsearchfield;
      this.searchObj.Type=SearchTypeEnum.NullGuid;
      this.searchfieldsfilter.SearchObjs.push(this.searchObj);
     }

    this.onLoadPageSearch();
  }

  onResetSearchForm(){
    this.namesearchfield=InitialConstants.DefaultString;
    this.areaidsearchfield = InitialConstants.DefaultSelectedDropDownListString;
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
    this._dataServiceService.areaService.getPaggedResult(this.searchfieldsfilter).subscribe((res)=>{
      this._dataServiceService.spinnerService.hide();
      if(res.statusCode == HttpStatusCodes.OK){
        this.previousdata=res.data ?? new PaggedResult<AreaDtoModel>();
        this.totalpages=PagingInfo.GetTotalPages(res.data?.pagerInfo.totalNumberOfPages ?? InitialConstants.DefaultNoPages);
      }else if (res.statusCode == HttpStatusCodes.NotFound){
        this.previousdata=new PaggedResult<AreaDtoModel>();
        this.totalpages=[];
      }else{
        this._dataServiceService.notificationService.showErrorNotification(res.message);
        this.previousdata=new PaggedResult<AreaDtoModel>();
        this.totalpages=[];
      }
    });
  }
  
}
