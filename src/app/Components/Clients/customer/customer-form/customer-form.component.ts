import { Component } from '@angular/core';
import { CustomerModel } from '../../../../Models/customer/Cutomer.Model';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.css'
})
export class CustomerFormComponent {
  customer!:CustomerModel;
}
