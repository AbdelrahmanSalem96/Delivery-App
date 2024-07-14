import { Component } from '@angular/core';
import { CustomerModel } from '../../../../Models/customer/Cutomer.Model';
import { PaggedResult } from '../../../../Core/SearchControls/PaggedResultInfo/PaggedResult';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css'
})
export class CustomerListComponent {
  previousdata!:PaggedResult<CustomerModel>;
}
