import { Component } from '@angular/core';
import { EmployeeModel } from '../../../../Models/Employee/Empoyee.Model';
import { PaggedResult } from '../../../../Core/SearchControls/PaggedResultInfo/PaggedResult';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
  previousdata!:PaggedResult<EmployeeModel>;
}
