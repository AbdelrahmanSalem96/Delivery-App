import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Configs } from '../../Core/Utility/Config';

import { Repository } from './Repository.Service';
import { IVehicleOwnerRepository } from '../Abstractions/IVehicleOwnerRepository.Service';

import { VehicleOwnerDtoModel,CreateVehicleOwnerModel,UpdateVehicleOwnerModel,DeleteVehicleOwnerModel} from '../../Models/VehicleOwner/VehicleOwner.Model';


@Injectable({
    providedIn: 'root',
  })
  
  export class VehicleOwnerService extends Repository<VehicleOwnerDtoModel,CreateVehicleOwnerModel,UpdateVehicleOwnerModel,DeleteVehicleOwnerModel> implements IVehicleOwnerRepository {
  
    constructor(protected override _http: HttpClient) {super(_http,Configs.apiUrl + Configs.appApiVerion + '/VehicleOwner');}
  
  }