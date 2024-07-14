import { IRepository } from './IRepository.Service';

import { EmployeeDtoModel,CreateEmployeeModel,UpdateEmployeeModel,DeleteEmployeeModel} from '../../Models/Employee/Employee.Model';

export interface IEmployeeRepository extends IRepository<EmployeeDtoModel,CreateEmployeeModel,UpdateEmployeeModel,DeleteEmployeeModel> {
}
