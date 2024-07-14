import { IRepository } from './IRepository.Service';

import { BankDtoModel,CreateBankModel,UpdateBankModel,DeleteBankModel} from '../../Models/Bank/Bank.Model';

export interface IBankRepository extends IRepository<BankDtoModel,CreateBankModel,UpdateBankModel,DeleteBankModel> {
}
