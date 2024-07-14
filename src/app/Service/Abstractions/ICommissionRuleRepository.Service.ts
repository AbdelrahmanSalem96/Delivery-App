import { IRepository } from './IRepository.Service';

import { CommissionRuleDtoModel,CreateCommissionRuleModel,UpdateCommissionRuleModel,DeleteCommissionRuleModel} from '../../Models/CommissionRule/CommissionRule.Model';

export interface ICommissionRuleRepository extends IRepository<CommissionRuleDtoModel,CreateCommissionRuleModel,UpdateCommissionRuleModel,DeleteCommissionRuleModel> {
}
