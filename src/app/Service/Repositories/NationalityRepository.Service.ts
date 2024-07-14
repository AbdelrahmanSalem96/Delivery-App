import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Configs } from '../../Core/Utility/Config';

import { Repository } from './Repository.Service';
import { INationalityRepository } from '../Abstractions/INationalityRepository.Service';

import { NationalityDtoModel,CreateNationalityModel,UpdateNationalityModel,DeleteNationalityModel} from '../../Models/Nationality/Nationality.Model';


@Injectable({
    providedIn: 'root',
  })
  
  export class NationalityService extends Repository<NationalityDtoModel,CreateNationalityModel,UpdateNationalityModel,DeleteNationalityModel> implements INationalityRepository {
  
    constructor(protected override _http: HttpClient) {super(_http,Configs.apiUrl + Configs.appApiVerion + '/Nationality');}
  
  }