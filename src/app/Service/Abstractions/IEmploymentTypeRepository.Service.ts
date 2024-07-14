import { IRepository } from './IRepository.Service';

import { EmploymentTypeDtoModel,CreateEmploymentTypeModel,UpdateEmploymentTypeModel,DeleteEmploymentTypeModel} from '../../Models/EmploymentType/EmploymentType.Model';

export interface IEmploymentTypeRepository extends IRepository<EmploymentTypeDtoModel,CreateEmploymentTypeModel,UpdateEmploymentTypeModel,DeleteEmploymentTypeModel> {
}
