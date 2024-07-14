import { IRepository } from './IRepository.Service';

import { VehicleTypeDtoModel,CreateVehicleTypeModel,UpdateVehicleTypeModel,DeleteVehicleTypeModel} from '../../Models/VehicleType/VehicleType.Model';

export interface IVehicleTypeRepository extends IRepository<VehicleTypeDtoModel,CreateVehicleTypeModel,UpdateVehicleTypeModel,DeleteVehicleTypeModel> {
}
