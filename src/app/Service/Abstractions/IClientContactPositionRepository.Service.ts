import { IRepository } from './IRepository.Service';

import { ClientContactPositionDtoModel,CreateClientContactPositionModel,UpdateClientContactPositionModel,DeleteClientContactPositionModel} from '../../Models/ClientContactPosition/ClientContactPosition.Model';

export interface IClientContactPositionRepository extends IRepository<ClientContactPositionDtoModel,CreateClientContactPositionModel,UpdateClientContactPositionModel,DeleteClientContactPositionModel> {
}
