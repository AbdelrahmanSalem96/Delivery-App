import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Configs } from '../../Core/Utility/Config';

import { Repository } from './Repository.Service';
import { ICaptinEarningTimeRepository } from '../Abstractions/ICaptinEarningTimeRepository.Service';

import { CaptinEarningTimeDtoModel,CreateCaptinEarningTimeModel,UpdateCaptinEarningTimeModel,DeleteCaptinEarningTimeModel} from '../../Models/CaptinEarningTime/CaptinEarningTime.Model';


@Injectable({
    providedIn: 'root',
  })
  
  export class CaptinEarningTimeService extends Repository<CaptinEarningTimeDtoModel,CreateCaptinEarningTimeModel,UpdateCaptinEarningTimeModel,DeleteCaptinEarningTimeModel> implements ICaptinEarningTimeRepository {
  
    constructor(protected override _http: HttpClient) {super(_http,Configs.apiUrl + Configs.appApiVerion + '/CaptinEarningTime');}
  
  }