import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Configs } from '../../Core/Utility/Config';

import { Repository } from './Repository.Service';
import { IEmployeeRepository } from '../Abstractions/IEmployeeRepository.Service';

import { EmployeeDtoModel,CreateEmployeeModel,UpdateEmployeeModel,DeleteEmployeeModel} from '../../Models/Employee/Employee.Model';


@Injectable({
    providedIn: 'root',
  })
  
  export class EmployeeService extends Repository<EmployeeDtoModel,CreateEmployeeModel,UpdateEmployeeModel,DeleteEmployeeModel> implements IEmployeeRepository {
  
    constructor(protected override _http: HttpClient) {super(_http,Configs.apiUrl + Configs.appApiVerion + '/Employee');}
  
  }