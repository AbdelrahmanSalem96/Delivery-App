import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import {TitleMessageEnum , BodyMessageEnum} from '../../Enum/Message.Enum';

@Injectable({
  providedIn: 'root'
})

export class NotificationService {

  constructor(private toastrService: ToastrService) { }

  showSuccess(message:string, title:string){
      this.toastrService.success(message, title);
  }

  showError(message:string, title:string){
      this.toastrService.error(message, title);
  }

  showInfo(message:string, title:string){
      this.toastrService.info(message, title);
  }

  showWarning(message:string, title:string){
      this.toastrService.warning(message, title);
  }

  addedSuccessfullyNotification(){
    this.toastrService.success(BodyMessageEnum.AddedSuccessfullyMessage,TitleMessageEnum.ConfirmTitle);
  }

  backUpSuccessfullyNotification(){
    this.toastrService.success(BodyMessageEnum.BackupSuccessfullyMessage,TitleMessageEnum.ConfirmTitle);
  }

  modifiedSuccessfullyNotification(){
    this.toastrService.success(BodyMessageEnum.ModifiedSuccessfullyMessage,TitleMessageEnum.ConfirmTitle);
  }

  confirmedSuccessFullyNotification(){
    this.toastrService.success(BodyMessageEnum.ConfirmedSuccessFullyMessage,TitleMessageEnum.ConfirmTitle);
  }

  deletedSuccessfullyNotification(){
    this.toastrService.success(BodyMessageEnum.DeletedSuccessfullyMessage,TitleMessageEnum.ConfirmTitle);
  }

  unExpectedErorrNotification(){
    this.toastrService.error(BodyMessageEnum.UnExpectedErorrMessage,TitleMessageEnum.ErrorTitle);
  }

  nameUsedBeforeNotification(){
    this.toastrService.error(BodyMessageEnum.NameUsedBeforeMessage,TitleMessageEnum.ErrorTitle);
  }

  invalidDataNotification(){
    this.toastrService.error(BodyMessageEnum.InvalidDataMessage,TitleMessageEnum.ErrorTitle);
  }

  userNameUsedBeforeNotification(){
    this.toastrService.error(BodyMessageEnum.EmailUsedBeforeMessage,TitleMessageEnum.ErrorTitle);
  }

  notFoundNotification(){
    this.toastrService.error(BodyMessageEnum.NotFoundMessage,TitleMessageEnum.ErrorTitle);
  }

  haveRowsNotification(){
    this.toastrService.error(BodyMessageEnum.HaveRowsMessage,TitleMessageEnum.ErrorTitle);
  }

  someInsertedOtherNotNotification(){
    this.toastrService.error(BodyMessageEnum.SomeInsertedOtherNotMessage,TitleMessageEnum.ErrorTitle);
  }

  someUpdatedOtherNotNotification(){
    this.toastrService.error(BodyMessageEnum.SomeUpdatedOtherNotMessage,TitleMessageEnum.ErrorTitle);
  }

  someDeletedOtherNotNotification(){
    this.toastrService.error(BodyMessageEnum.SomeDeletedOtherNotMessage,TitleMessageEnum.ErrorTitle);
  }

  allHaveRowsNotification(){
    this.toastrService.error(BodyMessageEnum.AllHaveRowsMessage,TitleMessageEnum.ErrorTitle);
  }

  allInsertedBeforeNotification(){
    this.toastrService.error(BodyMessageEnum.AllInsertedBeforeMessage,TitleMessageEnum.ErrorTitle);
  }

  updateDeletedBeforeNotification(){
    this.toastrService.error(BodyMessageEnum.UpdateDeletedBeforeMessage,TitleMessageEnum.ErrorTitle);
  }

  deletedDeletedBeforeNotification(){
    this.toastrService.error(BodyMessageEnum.DeletedDeletedBeforeMessage,TitleMessageEnum.ErrorTitle);
  }

  unExpectedErorrOnPageNotification(){
    this.toastrService.error(BodyMessageEnum.UnExpectedErorrOnPageMessage,TitleMessageEnum.ErrorTitle);
  }

  showSuccessNotification(message:string){
    this.toastrService.success(message, TitleMessageEnum.ConfirmTitle);
  }

  showErrorNotification(message:string){
    this.toastrService.error(message, TitleMessageEnum.ErrorTitle);
  }

  showInfoNotification(message:string){
    this.toastrService.info(message, TitleMessageEnum.InfoTitle);
  }

  showWarningNotification(message:string){
    this.toastrService.warning(message, TitleMessageEnum.WarnningTitle);
  }

}
