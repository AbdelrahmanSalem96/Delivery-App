import { IRepository } from './IRepository.Service';

import { VehicleOwnerDtoModel,CreateVehicleOwnerModel,UpdateVehicleOwnerModel,DeleteVehicleOwnerModel} from '../../Models/VehicleOwner/VehicleOwner.Model';

export interface IVehicleOwnerRepository extends IRepository<VehicleOwnerDtoModel,CreateVehicleOwnerModel,UpdateVehicleOwnerModel,DeleteVehicleOwnerModel> {
}
