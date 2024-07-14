import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Configs } from '../../Core/Utility/Config';

import { Repository } from './Repository.Service';
import { IOrderStateRepository } from '../Abstractions/IOrderStateRepository.Service';

import { OrderStateDtoModel,CreateOrderStateModel,UpdateOrderStateModel,DeleteOrderStateModel} from '../../Models/OrderState/OrderState.Model';


@Injectable({
    providedIn: 'root',
  })
  
  export class OrderStateService extends Repository<OrderStateDtoModel,CreateOrderStateModel,UpdateOrderStateModel,DeleteOrderStateModel> implements IOrderStateRepository {
  
    constructor(protected override _http: HttpClient) {super(_http,Configs.apiUrl + Configs.appApiVerion + '/OrderState/');}
  
  }