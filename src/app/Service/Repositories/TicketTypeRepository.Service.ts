import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Configs } from '../../Core/Utility/Config';

import { Repository } from './Repository.Service';
import { ITicketTypeRepository } from '../Abstractions/ITicketTypeRepository.Service';

import { TicketTypeDtoModel,CreateTicketTypeModel,UpdateTicketTypeModel,DeleteTicketTypeModel} from '../../Models/TicketType/TicketType.Model';


@Injectable({
    providedIn: 'root',
  })
  
  export class TicketTypeService extends Repository<TicketTypeDtoModel,CreateTicketTypeModel,UpdateTicketTypeModel,DeleteTicketTypeModel> implements ITicketTypeRepository {
  
    constructor(protected override _http: HttpClient) {super(_http,Configs.apiUrl + Configs.appApiVerion + '/TicketType');}
  
  }