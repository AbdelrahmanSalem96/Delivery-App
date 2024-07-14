import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Configs } from '../../Core/Utility/Config';

import { Repository } from './Repository.Service';
import { ICommissionRuleRepository } from '../Abstractions/ICommissionRuleRepository.Service';

import { CommissionRuleDtoModel,CreateCommissionRuleModel,UpdateCommissionRuleModel,DeleteCommissionRuleModel} from '../../Models/CommissionRule/CommissionRule.Model';


@Injectable({
    providedIn: 'root',
  })
  
  export class CommissionRuleService extends Repository<CommissionRuleDtoModel,CreateCommissionRuleModel,UpdateCommissionRuleModel,DeleteCommissionRuleModel> implements ICommissionRuleRepository {
  
    constructor(protected override _http: HttpClient) {super(_http,Configs.apiUrl + Configs.appApiVerion + '/CommissionRule');}
  
  }