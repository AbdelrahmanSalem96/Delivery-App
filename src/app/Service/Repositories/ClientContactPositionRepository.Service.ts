import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Configs } from '../../Core/Utility/Config';

import { Repository } from './Repository.Service';
import { IClientContactPositionRepository } from '../Abstractions/IClientContactPositionRepository.Service';

import { ClientContactPositionDtoModel,CreateClientContactPositionModel,UpdateClientContactPositionModel,DeleteClientContactPositionModel} from '../../Models/ClientContactPosition/ClientContactPosition.Model';


@Injectable({
    providedIn: 'root',
  })
  
  export class ClientContactPositionService extends Repository<ClientContactPositionDtoModel,CreateClientContactPositionModel,UpdateClientContactPositionModel,DeleteClientContactPositionModel> implements IClientContactPositionRepository {
  
    constructor(protected override _http: HttpClient) {super(_http,Configs.apiUrl + Configs.appApiVerion + '/ClientContactPosition');}
  
  }