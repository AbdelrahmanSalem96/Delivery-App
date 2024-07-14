import { Component, OnInit } from '@angular/core';
import { EmployeeModel } from '../../../../Models/Employee/Empoyee.Model';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent implements OnInit {
  employee: EmployeeModel = new EmployeeModel();
  showPassword: boolean = false;
  employeeRole = ["admin", "User"];
  ngOnInit(): void{

  }
  toggllePassword() {
    this.showPassword = !this.showPassword;
  }
}
