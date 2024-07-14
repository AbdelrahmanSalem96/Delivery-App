import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Configs } from '../../Core/Utility/Config';

import { Repository } from './Repository.Service';
import { IAreaRepository } from '../Abstractions/IAreaRepository.Service';

import { AreaDtoModel,CreateAreaModel,UpdateAreaModel,DeleteAreaModel} from '../../Models/Area/Area.Model';


@Injectable({
    providedIn: 'root',
  })
  
  export class AreaService extends Repository<AreaDtoModel,CreateAreaModel,UpdateAreaModel,DeleteAreaModel> implements IAreaRepository {
  
    constructor(protected override _http: HttpClient) {super(_http,Configs.apiUrl + Configs.appApiVerion + '/Area');}
  
  }