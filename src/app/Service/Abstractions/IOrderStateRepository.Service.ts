import { IRepository } from './IRepository.Service';

import { OrderStateDtoModel,CreateOrderStateModel,UpdateOrderStateModel,DeleteOrderStateModel} from '../../Models/OrderState/OrderState.Model';

export interface IOrderStateRepository extends IRepository<OrderStateDtoModel,CreateOrderStateModel,UpdateOrderStateModel,DeleteOrderStateModel> {
}
