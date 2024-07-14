import { IRepository } from './IRepository.Service';

import { ActivationStateDtoModel,CreateActivationStateModel,UpdateActivationStateModel,DeleteActivationStateModel} from '../../Models/ActivationState/ActivationState.Model';

export interface IActivationStateRepository extends IRepository<ActivationStateDtoModel,CreateActivationStateModel,UpdateActivationStateModel,DeleteActivationStateModel> {
}
