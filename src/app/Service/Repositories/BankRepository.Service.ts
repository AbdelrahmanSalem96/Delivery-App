import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Configs } from '../../Core/Utility/Config';

import { Repository } from './Repository.Service';
import { IBankRepository } from '../Abstractions/IBankRepository.Service';

import { BankDtoModel,CreateBankModel,UpdateBankModel,DeleteBankModel} from '../../Models/Bank/Bank.Model';


@Injectable({
    providedIn: 'root',
  })
  
  export class BankService extends Repository<BankDtoModel,CreateBankModel,UpdateBankModel,DeleteBankModel> implements IBankRepository {
  
    constructor(protected override _http: HttpClient) {super(_http,Configs.apiUrl + Configs.appApiVerion + '/Bank');}
  
  }