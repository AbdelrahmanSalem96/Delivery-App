import { IRepository } from './IRepository.Service';

import { CaptinEarningTimeDtoModel,CreateCaptinEarningTimeModel,UpdateCaptinEarningTimeModel,DeleteCaptinEarningTimeModel} from '../../Models/CaptinEarningTime/CaptinEarningTime.Model';

export interface ICaptinEarningTimeRepository extends IRepository<CaptinEarningTimeDtoModel,CreateCaptinEarningTimeModel,UpdateCaptinEarningTimeModel,DeleteCaptinEarningTimeModel> {
}
