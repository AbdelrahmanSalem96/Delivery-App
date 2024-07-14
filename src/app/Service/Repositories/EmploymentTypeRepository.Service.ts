import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Configs } from '../../Core/Utility/Config';

import { Repository } from './Repository.Service';
import { IEmploymentTypeRepository } from '../Abstractions/IEmploymentTypeRepository.Service';

import { EmploymentTypeDtoModel,CreateEmploymentTypeModel,UpdateEmploymentTypeModel,DeleteEmploymentTypeModel} from '../../Models/EmploymentType/EmploymentType.Model';


@Injectable({
    providedIn: 'root',
  })
  
  export class EmploymentTypeService extends Repository<EmploymentTypeDtoModel,CreateEmploymentTypeModel,UpdateEmploymentTypeModel,DeleteEmploymentTypeModel> implements IEmploymentTypeRepository {
  
    constructor(protected override _http: HttpClient) {super(_http,Configs.apiUrl + Configs.appApiVerion + '/EmploymentType');}
  
  }