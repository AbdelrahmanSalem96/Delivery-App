import { IRepository } from './IRepository.Service';

import { NationalityDtoModel,CreateNationalityModel,UpdateNationalityModel,DeleteNationalityModel} from '../../Models/Nationality/Nationality.Model';

export interface INationalityRepository extends IRepository<NationalityDtoModel,CreateNationalityModel,UpdateNationalityModel,DeleteNationalityModel> {
}
