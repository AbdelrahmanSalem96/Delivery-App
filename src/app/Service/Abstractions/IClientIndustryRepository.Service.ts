import { IRepository } from './IRepository.Service';

import { ClientIndustryDtoModel,CreateClientIndustryModel,UpdateClientIndustryModel,DeleteClientIndustryModel} from '../../Models/ClientIndustry/ClientIndustry.Model';

export interface IClientIndustryRepository extends IRepository<ClientIndustryDtoModel,CreateClientIndustryModel,UpdateClientIndustryModel,DeleteClientIndustryModel> {
}
