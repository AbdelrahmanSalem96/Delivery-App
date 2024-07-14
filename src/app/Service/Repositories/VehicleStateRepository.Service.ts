import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Configs } from '../../Core/Utility/Config';

import { Repository } from './Repository.Service';
import { IVehicleStateRepository } from '../Abstractions/IVehicleStateRepository.Service';

import { VehicleStateDtoModel,CreateVehicleStateModel,UpdateVehicleStateModel,DeleteVehicleStateModel} from '../../Models/VehicleState/VehicleState.Model';


@Injectable({
    providedIn: 'root',
  })
  
  export class VehicleStateService extends Repository<VehicleStateDtoModel,CreateVehicleStateModel,UpdateVehicleStateModel,DeleteVehicleStateModel> implements IVehicleStateRepository {
  
    constructor(protected override _http: HttpClient) {super(_http,Configs.apiUrl + Configs.appApiVerion + '/VehicleState');}
  
  }