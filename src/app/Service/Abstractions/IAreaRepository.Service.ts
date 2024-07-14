import { IRepository } from './IRepository.Service';

import { AreaDtoModel,CreateAreaModel,UpdateAreaModel,DeleteAreaModel} from '../../Models/Area/Area.Model';

export interface IAreaRepository extends IRepository<AreaDtoModel,CreateAreaModel,UpdateAreaModel,DeleteAreaModel> {
}
