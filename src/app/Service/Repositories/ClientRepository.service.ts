import { Injectable } from '@angular/core';
import { IClientRepositoryService } from '../Abstractions/IClientRepository.service';
import { ClientModel } from '../../Models/Client/Client.Model';
import { Repository } from './Repository.Service';
import { HttpClient } from '@angular/common/http';
import { Configs } from '../../Core/Utility/Config';

@Injectable({
  providedIn: 'root'
})
export class CLientRepositoryService extends Repository<ClientModel,ClientModel,ClientModel,ClientModel> implements IClientRepositoryService {

  constructor(protected override _http: HttpClient) {super(_http,Configs.apiUrl + Configs.appApiVerion + '/Client/');}

}
