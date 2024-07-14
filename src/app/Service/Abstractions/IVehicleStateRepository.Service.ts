import { IRepository } from './IRepository.Service';

import { VehicleStateDtoModel,CreateVehicleStateModel,UpdateVehicleStateModel,DeleteVehicleStateModel} from '../../Models/VehicleState/VehicleState.Model';

export interface IVehicleStateRepository extends IRepository<VehicleStateDtoModel,CreateVehicleStateModel,UpdateVehicleStateModel,DeleteVehicleStateModel> {
}
