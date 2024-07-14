import { Component } from '@angular/core';
import { CaptinModel } from '../../../../Models/Captin/Captin.Model';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-captin-form',
  templateUrl: './captin-form.component.html',
  styleUrl: './captin-form.component.css'
})
export class CaptinFormComponent {
  captin:CaptinModel = new CaptinModel();
  commissionRole = ["Role 1", "Role 2"];
  natonality = ["N1", "N2", "N3", "N4"];
  periority = ["P1", "P2", "P3", "P4"];
  workingArea = ["Area 1", "Area 2", "Area 3", "Area 4"];
  WorkingRejoin = ["Regoin 1", "Regoin 2", "Regoin 3", "Regoin 4"];
  state = ["Active", "Pending", "Not Active"];
  type = ["T1", "T2", "T3", "T4"];
  vehicle = ["V1", "V2", "V3", "V4"];


  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = true;

  constructor(private _formBuilder: FormBuilder) {}
}
