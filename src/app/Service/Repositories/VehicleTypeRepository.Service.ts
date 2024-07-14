import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Configs } from '../../Core/Utility/Config';

import { Repository } from './Repository.Service';
import { IVehicleTypeRepository } from '../Abstractions/IVehicleTypeRepository.Service';

import { VehicleTypeDtoModel,CreateVehicleTypeModel,UpdateVehicleTypeModel,DeleteVehicleTypeModel} from '../../Models/VehicleType/VehicleType.Model';


@Injectable({
    providedIn: 'root',
  })
  
  export class VehicleTypeService extends Repository<VehicleTypeDtoModel,CreateVehicleTypeModel,UpdateVehicleTypeModel,DeleteVehicleTypeModel> implements IVehicleTypeRepository {
  
    constructor(protected override _http: HttpClient) {super(_http,Configs.apiUrl + Configs.appApiVerion + '/VehicleType');}
  
  }