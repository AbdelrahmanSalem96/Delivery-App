import { Component } from '@angular/core';
import { VehicleOwnerModel } from '../../../../Models/VehicleOwner/VehicleOwner.Model';

@Component({
  selector: 'app-vehicle-owner-form',
  templateUrl: './vehicle-owner-form.component.html',
  styleUrl: './vehicle-owner-form.component.css'
})
export class VehicleOwnerFormComponent {
  vehicleOwner !:VehicleOwnerModel;
}
