import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//authentications
import { LoginComponent } from './Components/Authentications/login/login.component';

//general
import { NotFoundComponent } from './Components/General/not-found/not-found.component';
import { UnauthorizeComponent } from './Components/General/unauthorize/unauthorize.component';

import { HomeComponent } from './Components/home/home.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';

// order
import { OrderComponent } from './Components/Orders/order/order.component';
import { OrderTrackingComponent } from './Components/Orders/order-tracking/order-tracking.component';

//captin
import { CaptinComponent } from './Components/Captins/captin/captin.component';
import { EmploymentTypeComponent } from './Components/Captins/employment-type/employment-type.component';
import { ActivationStateComponent } from './Components/Captins/activation-state/activation-state.component';
import { CaptinTrackingComponent } from './Components/Captins/captin-tracking/captin-tracking.component';
import { CaptinEarningTimeComponent } from './Components/Captins/captin-earning-time/captin-earning-time.component';

//employee
import { EmployeesComponent } from './Components/Employees/employee/employees.component';

//ticket
import { TicketComponent } from './Components/Tickets/ticket/ticket.component';
import { TicketTypeComponent } from './Components/Tickets/ticket-type/ticket-type.component';

//client
import { ClientComponent } from './Components/Clients/client/client.component';
import { ClientBranchComponent } from './Components/Clients/client-branch/client-branch.component';
import { ClientContactPositionComponent } from './Components/Clients/client-contact-position/client-contact-position.component';
import { ClientIndustryComponent } from './Components/Clients/client-industry/client-industry.component';

//commission rule
import { CommissionRuleComponent } from './Components/commission-rule/commission-rule.component';

// vehicles
import { VehicleComponent } from './Components/Vehicles/vehicle/vehicle.component';
import { VehicleStateComponent } from './Components/Vehicles/vehicle-state/vehicle-state.component';
import { VehicleTypeComponent } from './Components/Vehicles/vehicle-type/vehicle-type.component';
import { VehicleOwnerComponent } from './Components/Vehicles/vehicle-owner/vehicle-owner.component';

// areas
import { CountryAreaComponent } from './Components/Areas/country-area/country-area.component';
import { RegionAreaComponent } from './Components/Areas/region-area/region-area.component';
import { AreaAreaComponent } from './Components/Areas/area-area/area-area.component';
import { ZoneAreaComponent } from './Components/Areas/zone-area/zone-area.component';

// app setting
import { BankComponent } from './Components/AppSettings/bank/bank.component';
import { NationalityComponent } from './Components/AppSettings/nationality/nationality.component';

// customer
import { CustomerComponent } from './Components/Clients/customer/customer.component';
import { OrderCreateComponent } from './Components/Orders/order/order-create/order-create.component';
import { TicketAddNewComponent } from './Components/Tickets/ticket/ticket-add-new/ticket-add-new.component';
import { OrderUpdateComponent } from './Components/Orders/order/order-update/order-update.component';
import { CaptinUpdateComponent } from './Components/Captins/captin/captin-update/captin-update.component';
import { CaptinCreateComponent } from './Components/Captins/captin/captin-create/captin-create.component';
import { CaptinFormComponent } from './Components/Captins/captin/captin-form/captin-form.component';
import { ClientCreateComponent } from './Components/Clients/client/client-create/client-create.component';
import { ClientUpdateComponent } from './Components/Clients/client/client-update/client-update.component';
import { ClientBranchCreateComponent } from './Components/Clients/client-branch/client-branch-create/client-branch-create.component';
import { ClientBranchUpdateComponent } from './Components/Clients/client-branch/client-branch-update/client-branch-update.component';
import { OrderFlowComponent } from './Components/Orders/order-flow/order-flow.component';
import { VehicleCreateComponent } from './Components/Vehicles/vehicle/vehicle-create/vehicle-create.component';
import { VehicleUpdateComponent } from './Components/Vehicles/vehicle/vehicle-update/vehicle-update.component';
import { AuthGuard } from './Gard/auth.guard';
import { OrderStateComponent } from './Components/Orders/order-state/order-state.component';

const routes: Routes = [
  { path: 'login', component:LoginComponent ,canActivate:[]},
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  { path: 'home', component:HomeComponent ,canActivate: [AuthGuard], data: { expectedRoles: ['Admin', 'SuperAdmin', 'Client', 'ClientBranch']}},
  { path: 'dashboard', component:DashboardComponent ,canActivate:[AuthGuard], data: { expectedRoles: ['Admin', 'SuperAdmin']}},

  { path: 'order', component:OrderComponent ,canActivate:[AuthGuard], data: { expectedRoles: ['Admin', 'SuperAdmin', 'Client', 'ClientBranch']}},
  { path: 'order/create', component:OrderCreateComponent ,canActivate:[AuthGuard], data: { expectedRoles: ['Admin', 'SuperAdmin', 'Client', 'ClientBranch']} },
  { path: 'order/orderflow/:id', component:OrderFlowComponent ,canActivate:[AuthGuard], data: { expectedRoles: ['Admin', 'SuperAdmin', 'Client', 'ClientBranch']} },
  { path: 'order/orderflow/:id/addticket', component: TicketAddNewComponent },
  { path: 'orderstate', component:OrderStateComponent },
  { path: 'ordertracking/:id', component:OrderTrackingComponent },

  { path: 'captin', component:CaptinComponent ,canActivate:[AuthGuard], data: { expectedRoles: ['Admin', 'SuperAdmin']}},
  { path: 'captin/form', component:CaptinFormComponent },
  { path: 'captin/create', component:CaptinCreateComponent },
  { path: 'captin/update/:id', component: CaptinUpdateComponent },
  { path: 'employmenttype', component: EmploymentTypeComponent ,canActivate:[AuthGuard], data: { expectedRoles: ['Admin', 'SuperAdmin']} },
  { path: 'activationstate', component: ActivationStateComponent, canActivate:[AuthGuard], data: { expectedRoles: ['Admin', 'SuperAdmin']} },
  { path: 'captintracking', component:CaptinTrackingComponent, canActivate:[AuthGuard], data: { expectedRoles: ['Admin', 'SuperAdmin']} },

  { path: 'employee', component: EmployeesComponent,canActivate:[AuthGuard], data: { expectedRoles: ['Admin', 'SuperAdmin']}},

  { path: 'ticket', component: TicketComponent,canActivate:[AuthGuard], data: { expectedRoles: ['Admin', 'SuperAdmin']}},
  { path: 'tickettype', component: TicketTypeComponent,canActivate:[AuthGuard], data: { expectedRoles: ['Admin', 'SuperAdmin']}},

  { path: 'bank', component:BankComponent ,canActivate:[AuthGuard], data: { expectedRoles: ['Admin', 'SuperAdmin']}},
  { path: 'nationality', component:NationalityComponent ,canActivate:[AuthGuard], data: { expectedRoles: ['Admin', 'SuperAdmin']}},

  { path: 'client', component:ClientComponent ,canActivate:[AuthGuard], data: { expectedRoles: ['Admin', 'SuperAdmin']}},
  { path: 'client/create', component:ClientCreateComponent },
  { path: 'client/update/:id', component: ClientUpdateComponent },
  { path: 'client/:id/clientbranch', component:ClientBranchComponent },
  { path: 'client/:id/branch', component:ClientBranchComponent },
  { path: 'clientbranch/create', component:ClientBranchCreateComponent },
  { path: 'client/:id/branch/create', component:ClientBranchCreateComponent },
  { path: 'clientbranch/update/:id', component: ClientBranchUpdateComponent },
  { path: 'clientcontactposition', component:ClientContactPositionComponent ,canActivate:[AuthGuard], data: { expectedRoles: ['Admin', 'SuperAdmin']} },
  { path: 'clientindustry', component:ClientIndustryComponent ,canActivate:[AuthGuard], data: { expectedRoles: ['Admin', 'SuperAdmin']} },
  // { path: 'customer', component:CustomerComponent ,canActivate:[AuthGuard], data: { expectedRoles: ['Admin', 'SuperAdmin']}},

  { path: 'commissionrule', component:CommissionRuleComponent ,canActivate:[AuthGuard], data: { expectedRoles: ['Admin', 'SuperAdmin']}},

  { path: 'vehicle', component:VehicleComponent ,canActivate:[AuthGuard], data: { expectedRoles: ['Admin', 'SuperAdmin']}},
  { path: 'vehicle/create', component:VehicleCreateComponent },
  { path: 'vehicle/update/:id', component: VehicleUpdateComponent },

  { path: 'vehiclestate', component:VehicleStateComponent ,canActivate:[AuthGuard], data: { expectedRoles: ['Admin', 'SuperAdmin']}},
  { path: 'vehicletype', component:VehicleTypeComponent ,canActivate:[AuthGuard], data: { expectedRoles: ['Admin', 'SuperAdmin']}},
  { path: 'vehicleowner', component:VehicleOwnerComponent ,canActivate:[AuthGuard], data: { expectedRoles: ['Admin', 'SuperAdmin']}},

  { path: 'country', component:CountryAreaComponent ,canActivate:[AuthGuard], data: { expectedRoles: ['Admin', 'SuperAdmin']}},
  { path: 'region', component:RegionAreaComponent ,canActivate:[AuthGuard], data: { expectedRoles: ['Admin', 'SuperAdmin']}},
  { path: 'area', component:AreaAreaComponent ,canActivate:[AuthGuard], data: { expectedRoles: ['Admin', 'SuperAdmin']}},
  { path: 'zone', component:ZoneAreaComponent ,canActivate:[AuthGuard], data: { expectedRoles: ['Admin', 'SuperAdmin']}},

  { path: 'unauthorize', component:UnauthorizeComponent},
  { path: 'notfound', component: NotFoundComponent},
  { path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
