import { IRepository } from './IRepository.Service';

import { TicketTypeDtoModel,CreateTicketTypeModel,UpdateTicketTypeModel,DeleteTicketTypeModel} from '../../Models/TicketType/TicketType.Model';

export interface ITicketTypeRepository extends IRepository<TicketTypeDtoModel,CreateTicketTypeModel,UpdateTicketTypeModel,DeleteTicketTypeModel> {
}
