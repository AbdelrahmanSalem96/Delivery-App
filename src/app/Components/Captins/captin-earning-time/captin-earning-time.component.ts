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

import {CreateCaptinEarningTimeModel,UpdateCaptinEarningTimeModel,DeleteCaptinEarningTimeModel,CaptinEarningTimeDtoModel} from '../../../Models/CaptinEarningTime/CaptinEarningTime.Model';
import { CriteriaSearch } from '../../../Core/SearchControls/PaggedCriteriaInfo/CriteriaSearch';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-captin-earning-time',
  templateUrl: './captin-earning-time.component.html',
  styleUrl: './captin-earning-time.component.css'
})
export class CaptinEarningTimeComponent {

  startDate:Date=new Date();
  endDate:Date=new Date();
  isrequireddate:boolean=InitialConstants.DefaultNotRequired;

  captinEarningTime:CaptinEarningTimeDtoModel =new CaptinEarningTimeDtoModel();
  updateCaptinEarningTime:UpdateCaptinEarningTimeModel=new UpdateCaptinEarningTimeModel();

 
  isshowbuttonsave:boolean=InitialConstants.DefaultShow;
  isdisabledbutton:boolean=InitialConstants.DefaultOffDisabled;

  currentUser:string='8c037a32-68d7-4c38-913e-311ce44fa16e';

  constructor(private _dataServiceService:DataServiceService) {}

  ngOnInit(): void {
    let searchAreafilter :CriteriaSearch<CaptinEarningTimeDtoModel> = new CriteriaSearch<CaptinEarningTimeDtoModel>();
    this._dataServiceService.captinEarningTimeService.getOne(searchAreafilter).subscribe(res=>{
      this.captinEarningTime = res.data ?? new CaptinEarningTimeDtoModel();
    });
  }

  onSubmit(){
    this._dataServiceService.spinnerService.show();
    this.isdisabledbutton=InitialConstants.DefaultOnDisabled;
      if(this.captinEarningTime.startDate >= this.captinEarningTime.endDate ){
        this._dataServiceService.notificationService.showErrorNotification(BodyMessageEnum.StartDateValidIsRequiredMessage);
        this._dataServiceService.spinnerService.hide();
        this.isdisabledbutton=InitialConstants.DefaultOffDisabled;
      }else{
        this.updateCaptinEarningTime.id=this.captinEarningTime.id;
        this.updateCaptinEarningTime.startDate=this.captinEarningTime.startDate;
        this.updateCaptinEarningTime.endDate=this.captinEarningTime.endDate;
        this.updateCaptinEarningTime.lastUpdatedById=this.currentUser;
        this._dataServiceService.captinEarningTimeService.update(this.updateCaptinEarningTime).subscribe((res)=>{
          this._dataServiceService.spinnerService.hide();
          if(res.statusCode==HttpStatusCodes.OK){
            this._dataServiceService.notificationService.modifiedSuccessfullyNotification();
            this.isdisabledbutton=InitialConstants.DefaultOffDisabled;
          }else{
            this._dataServiceService.notificationService.showErrorNotification(res.message);
            this.isdisabledbutton=InitialConstants.DefaultOffDisabled;
          }
        });
      }
  }
}
