import { Injectable } from '@angular/core';
import { IRepository } from './IRepository.Service';
import { ClientModel } from '../../Models/Client/Client.Model';

export interface IClientRepositoryService extends IRepository<ClientModel,ClientModel,ClientModel,ClientModel> {
}
