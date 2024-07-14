import { EmployeeService } from './../Repositories/EmployeeRepository.Service';
import { Injectable, Injector } from '@angular/core';

import { SpinnerService } from './Spinner.Service';
import { NotificationService } from './Notification.Service ';

import { VehicleTypeService } from '../Repositories/VehicleTypeRepository.Service';
import { AreaService } from '../Repositories/AreaRepository.Service';
import { ActivationStateService } from '../Repositories/ActivationStateRepository.Service';
import { BankService } from '../Repositories/BankRepository.Service';
import { ClientContactPositionService } from '../Repositories/ClientContactPositionRepository.Service';
import { ClientIndustryService } from '../Repositories/ClientIndustryRepository.Service';
import { CommissionRuleService } from '../Repositories/CommissionRuleRepository.Service';
import { EmploymentTypeService } from '../Repositories/EmploymentTypeRepository.Service';
import { NationalityService } from '../Repositories/NationalityRepository.Service';
import { TicketTypeService } from '../Repositories/TicketTypeRepository.Service';
import { VehicleStateService } from '../Repositories/VehicleStateRepository.Service';
import { VehicleOwnerService } from '../Repositories/VehicleOwnerRepository.Service';
import { CaptinEarningTimeService } from '../Repositories/CaptinEarningTimeRepository.Service';
import { OrderStateService } from '../Repositories/OrderStateRepository.Service';


@Injectable({
    providedIn: 'root',
})

export class DataServiceService {

  private _activationStateService: ActivationStateService | null = null;
  public get activationStateService(): ActivationStateService {
    if(!this._activationStateService){
      this._activationStateService = this.injector.get(ActivationStateService);
    }
    return this._activationStateService;
  }

  private _areaService: AreaService | null = null;
  public get areaService(): AreaService {
    if(!this._areaService){
      this._areaService = this.injector.get(AreaService);
    }
    return this._areaService;
  }

  private _bankService: BankService | null = null;
  public get bankService(): BankService {
    if(!this._bankService){
      this._bankService = this.injector.get(BankService);
    }
    return this._bankService;
  }

  private _clientContactPositionService: ClientContactPositionService | null = null;
  public get clientContactPositionService(): ClientContactPositionService {
    if(!this._clientContactPositionService){
      this._clientContactPositionService = this.injector.get(ClientContactPositionService);
    }
    return this._clientContactPositionService;
  }

  private _clientIndustryService: ClientIndustryService | null = null;
  public get clientIndustryService(): ClientIndustryService {
    if(!this._clientIndustryService){
      this._clientIndustryService = this.injector.get(ClientIndustryService);
    }
    return this._clientIndustryService;
  }

  private _commissionRuleService: CommissionRuleService | null = null;
  public get commissionRuleService(): CommissionRuleService {
    if(!this._commissionRuleService){
      this._commissionRuleService = this.injector.get(CommissionRuleService);
    }
    return this._commissionRuleService;
  }

  private _employmentTypeService: EmploymentTypeService | null = null;
  public get employmentTypeService(): EmploymentTypeService {
    if(!this._employmentTypeService){
      this._employmentTypeService = this.injector.get(EmploymentTypeService);
    }
    return this._employmentTypeService;
  }

  private _nationalityService: NationalityService | null = null;
  public get nationalityService(): NationalityService {
    if(!this._nationalityService){
      this._nationalityService = this.injector.get(NationalityService);
    }
    return this._nationalityService;
  }

  private _ticketTypeService: TicketTypeService | null = null;
  public get ticketTypeService(): TicketTypeService {
    if(!this._ticketTypeService){
      this._ticketTypeService = this.injector.get(TicketTypeService);
    }
    return this._ticketTypeService;
  }

  private _employeeService: EmployeeService | null = null;
  public get employeeService(): EmployeeService {
    if(!this._employeeService){
      this._employeeService = this.injector.get(EmployeeService);
    }
    return this._employeeService;
  }

  private _vehicleStateService: VehicleStateService | null = null;
  public get vehicleStateService(): VehicleStateService {
    if(!this._vehicleStateService){
      this._vehicleStateService = this.injector.get(VehicleStateService);
    }
    return this._vehicleStateService;
  }

  private _vehicleTypeService: VehicleTypeService | null = null;
  public get vehicleTypeService(): VehicleTypeService {
    if(!this._vehicleTypeService){
      this._vehicleTypeService = this.injector.get(VehicleTypeService);
    }
    return this._vehicleTypeService;
  }

  private _vehicleOwnerService: VehicleOwnerService | null = null;
  public get vehicleOwnerService(): VehicleOwnerService {
    if(!this._vehicleOwnerService){
      this._vehicleOwnerService = this.injector.get(VehicleOwnerService);
    }
    return this._vehicleOwnerService;
  }

  private _orderStateService: OrderStateService | null = null;
  public get orderStateService(): OrderStateService {
    if(!this._orderStateService){
      this._orderStateService = this.injector.get(OrderStateService);
    }
    return this._orderStateService;
  }
  
  private _captinEarningTimeService: CaptinEarningTimeService | null = null;
  public get captinEarningTimeService(): CaptinEarningTimeService {
    if(!this._captinEarningTimeService){
      this._captinEarningTimeService = this.injector.get(CaptinEarningTimeService);
    }
    return this._captinEarningTimeService;
  }

  private _notificationService: NotificationService | null = null;
  public get notificationService(): NotificationService {
    if(!this._notificationService){
      this._notificationService = this.injector.get(NotificationService);
    }
    return this._notificationService;
  }

  private _spinnerService: SpinnerService | null = null;
  public get spinnerService(): SpinnerService {
    if(!this._spinnerService){
      this._spinnerService = this.injector.get(SpinnerService);
    }
    return this._spinnerService;
  }

  constructor(private injector: Injector) {  }

}
