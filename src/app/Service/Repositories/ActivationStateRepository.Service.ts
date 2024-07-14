import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Configs } from '../../Core/Utility/Config';

import { Repository } from './Repository.Service';
import { IActivationStateRepository } from '../Abstractions/IActivationStateRepository.Service';

import { ActivationStateDtoModel,CreateActivationStateModel,UpdateActivationStateModel,DeleteActivationStateModel} from '../../Models/ActivationState/ActivationState.Model';


@Injectable({
    providedIn: 'root',
  })
  
  export class ActivationStateService extends Repository<ActivationStateDtoModel,CreateActivationStateModel,UpdateActivationStateModel,DeleteActivationStateModel> implements IActivationStateRepository {
  
    constructor(protected override _http: HttpClient) {super(_http,Configs.apiUrl + Configs.appApiVerion + '/ActivationState');}
  
  }