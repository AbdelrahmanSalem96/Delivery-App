import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Configs } from '../../Core/Utility/Config';

import { Repository } from './Repository.Service';
import { IClientIndustryRepository } from '../Abstractions/IClientIndustryRepository.Service';

import { ClientIndustryDtoModel,CreateClientIndustryModel,UpdateClientIndustryModel,DeleteClientIndustryModel} from '../../Models/ClientIndustry/ClientIndustry.Model';


@Injectable({
    providedIn: 'root',
  })
  
  export class ClientIndustryService extends Repository<ClientIndustryDtoModel,CreateClientIndustryModel,UpdateClientIndustryModel,DeleteClientIndustryModel> implements IClientIndustryRepository {
  
    constructor(protected override _http: HttpClient) {super(_http,Configs.apiUrl + Configs.appApiVerion + '/ClientIndustry');}
  
  }