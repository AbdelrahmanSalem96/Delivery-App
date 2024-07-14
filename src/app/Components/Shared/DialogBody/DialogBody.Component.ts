import { Component, OnInit,Inject  } from '@angular/core';

import { InitialConstants } from '../../../Core/Constant/InitialConstant';

import { DialogReturnValueEnum } from '../../../Enum/DialogReturn.Enum';

import {
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-dialogbody',
  templateUrl: './DialogBody.Component.html',
  styleUrl: './DialogBody.Component.css',
  standalone: true,
  imports: [MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
})
export class DialogbodyComponent implements OnInit {

  message:string=InitialConstants.DefaultString ;
  constructor(public dialogRef: MatDialogRef<DialogbodyComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {this.message=this.data.message}

  no(): void {this.dialogRef.close(DialogReturnValueEnum.No);}

  yes(): void {this.dialogRef.close(DialogReturnValueEnum.Yes);}
}
