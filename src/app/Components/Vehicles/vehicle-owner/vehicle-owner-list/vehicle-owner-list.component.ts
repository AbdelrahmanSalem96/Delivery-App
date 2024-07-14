import { Component } from '@angular/core';
import { VehicleOwnerModel } from '../../../../Models/VehicleOwner/VehicleOwner.Model';
import { PaggedResult } from '../../../../Core/SearchControls/PaggedResultInfo/PaggedResult';

@Component({
  selector: 'app-vehicle-owner-list',
  templateUrl: './vehicle-owner-list.component.html',
  styleUrl: './vehicle-owner-list.component.css'
})
export class VehicleOwnerListComponent {
  previousdata!:PaggedResult<VehicleOwnerModel>;
}
