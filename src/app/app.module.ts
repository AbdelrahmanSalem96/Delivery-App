import { APP_INITIALIZER, NgModule, PLATFORM_ID } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxPaginationModule } from 'ngx-pagination';

import { GoogleMapsModule, MapDirectionsRenderer } from '@angular/google-maps';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

// Material components
import {MatGridListModule} from '@angular/material/grid-list';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import {MatStepperModule} from '@angular/material/stepper';
import {MatToolbarModule} from '@angular/material/toolbar';


import { MatInputModule } from '@angular/material/input';
import { MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';



import { CountryAreaComponent } from './Components/Areas/country-area/country-area.component';
import { NotFoundComponent } from './Components/General/not-found/not-found.component';
import { UnauthorizeComponent } from './Components/General/unauthorize/unauthorize.component';
import { HomeComponent } from './Components/home/home.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { RegionAreaComponent } from './Components/Areas/region-area/region-area.component';
import { AreaAreaComponent } from './Components/Areas/area-area/area-area.component';
import { ZoneAreaComponent } from './Components/Areas/zone-area/zone-area.component';
import { VehicleComponent } from './Components/Vehicles/vehicle/vehicle.component';
import { VehicleStateComponent } from './Components/Vehicles/vehicle-state/vehicle-state.component';
import { VehicleTypeComponent } from './Components/Vehicles/vehicle-type/vehicle-type.component';
import { VehicleOwnerComponent } from './Components/Vehicles/vehicle-owner/vehicle-owner.component';
import { OrderComponent } from './Components/Orders/order/order.component';
import { TicketComponent } from './Components/Tickets/ticket/ticket.component';
import { TicketTypeComponent } from './Components/Tickets/ticket-type/ticket-type.component';
import { CommissionRuleComponent } from './Components/commission-rule/commission-rule.component';
import { ClientIndustryComponent } from './Components/Clients/client-industry/client-industry.component';
import { ClientContactPositionComponent } from './Components/Clients/client-contact-position/client-contact-position.component';
import { ClientBranchComponent } from './Components/Clients/client-branch/client-branch.component';
import { BankComponent } from './Components/AppSettings/bank/bank.component';
import { NationalityComponent } from './Components/AppSettings/nationality/nationality.component';
import { CaptinComponent } from './Components/Captins/captin/captin.component';
import { ActivationStateComponent } from './Components/Captins/activation-state/activation-state.component';
import { EmploymentTypeComponent } from './Components/Captins/employment-type/employment-type.component';
import { LoginComponent } from './Components/Authentications/login/login.component';
import { EmployeesComponent } from './Components/Employees/employee/employees.component';
import { CaptinTrackingComponent } from './Components/Captins/captin-tracking/captin-tracking.component';

import { CaptinEarningTimeComponent } from './Components/Captins/captin-earning-time/captin-earning-time.component';

import { OrderTrackingComponent } from './Components/Orders/order-tracking/order-tracking.component';

import { TicketFormComponent } from './Components/Tickets/ticket/ticket-form/ticket-form.component';
import { TicketListComponent } from './Components/Tickets/ticket/ticket-list/ticket-list.component';
import { TicketSearchComponent } from './Components/Tickets/ticket/ticket-search/ticket-search.component';
import { CustomerComponent } from './Components/Clients/customer/customer.component';
import { CustomerFormComponent } from './Components/Clients/customer/customer-form/customer-form.component';
import { CustomerListComponent } from './Components/Clients/customer/customer-list/customer-list.component';
import { CustomerSearchComponent } from './Components/Clients/customer/customer-search/customer-search.component';
import { CaptinFormComponent } from './Components/Captins/captin/captin-form/captin-form.component';
import { CaptinListComponent } from './Components/Captins/captin/captin-list/captin-list.component';
import { CaptinSearchComponent } from './Components/Captins/captin/captin-search/captin-search.component';
import { ClientFormComponent } from './Components/Clients/client/client-form/client-form.component';
import { ClientListComponent } from './Components/Clients/client/client-list/client-list.component';
import { ClientSearchComponent } from './Components/Clients/client/client-search/client-search.component';
import { ClientComponent } from './Components/Clients/client/client.component';
import { ClientBranchFormComponent } from './Components/Clients/client-branch/client-branch-form/client-branch-form.component';
import { ClientBranchListComponent } from './Components/Clients/client-branch/client-branch-list/client-branch-list.component';
import { ClientBranchSearchComponent } from './Components/Clients/client-branch/client-branch-search/client-branch-search.component';

import { OrderListComponent } from './Components/Orders/order/order-list/order-list.component';
import { OrderCreateComponent } from './Components/Orders/order/order-create/order-create.component';
import { TicketAddNewComponent } from './Components/Tickets/ticket/ticket-add-new/ticket-add-new.component';
import { MatSelectModule } from '@angular/material/select';
import { VehicleFormComponent } from './Components/Vehicles/vehicle/vehicle-form/vehicle-form.component';
import { VehicleListComponent } from './Components/Vehicles/vehicle/vehicle-list/vehicle-list.component';
import { VehicleSearchComponent } from './Components/Vehicles/vehicle/vehicle-search/vehicle-search.component';
import { OrderUpdateComponent } from './Components/Orders/order/order-update/order-update.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CaptinCreateComponent } from './Components/Captins/captin/captin-create/captin-create.component';
import { CaptinUpdateComponent } from './Components/Captins/captin/captin-update/captin-update.component';
import { DatePipe, isPlatformBrowser } from '@angular/common';
import { ClientCreateComponent } from './Components/Clients/client/client-create/client-create.component';
import { ClientUpdateComponent } from './Components/Clients/client/client-update/client-update.component';
import { ClientBranchCreateComponent } from './Components/Clients/client-branch/client-branch-create/client-branch-create.component';
import { ClientBranchUpdateComponent } from './Components/Clients/client-branch/client-branch-update/client-branch-update.component';
import { OrderFlowComponent } from './Components/Orders/order-flow/order-flow.component';
import { OrderLogsComponent } from './Components/Orders/order-logs/order-logs.component';
import { DateConvertPipe } from './Service/date-convert.pipe';
import { VehicleCreateComponent } from './Components/Vehicles/vehicle/vehicle-create/vehicle-create.component';
import { VehicleUpdateComponent } from './Components/Vehicles/vehicle/vehicle-update/vehicle-update.component';

import { OrderStateComponent } from './Components/Orders/order-state/order-state.component';
import { AuthInterceptor } from './Gard/auth.interceptor';
import { AuthService } from './Service/Test Service/auth.service';
import { NavmenuComponent } from './Components/Shared/NavMenu/NavMenu.Component';
import { RightSideMenuComponent } from './Components/Shared/RightSideMenu/RightSideMenu.Component';
import { Configs } from './Core/Utility/Config';

// export function loadGoogleMapsScript(platformId: Object) {
//   return () => {
//     if (isPlatformBrowser(platformId)) {
//       const script = document.createElement('script');
//       script.src = `https://maps.googleapis.com/maps/api/js?key=${Configs.googleMapsApiKey}`;
//       script.async = true;
//       script.defer = true;
//       document.head.appendChild(script);
//     }
//   };
// }

@NgModule({
  declarations: [
    AppComponent,
    OrderStateComponent,
    CountryAreaComponent,
    NotFoundComponent,
    UnauthorizeComponent,
    HomeComponent,
    DashboardComponent,
    RegionAreaComponent,
    AreaAreaComponent,
    ZoneAreaComponent,
    VehicleComponent,
    VehicleStateComponent,
    VehicleTypeComponent,
    VehicleOwnerComponent,
    OrderComponent,
    TicketComponent,
    TicketTypeComponent,
    CommissionRuleComponent,
    ClientIndustryComponent,
    ClientContactPositionComponent,
    ClientBranchComponent,
    BankComponent,
    NationalityComponent,
    CaptinComponent,
    ActivationStateComponent,
    EmploymentTypeComponent,
    LoginComponent,
    EmployeesComponent,
    NavmenuComponent,
    RightSideMenuComponent,
    CaptinTrackingComponent,
    TicketFormComponent,
    TicketListComponent,
    TicketSearchComponent,
    CustomerComponent,
    CustomerFormComponent,
    CustomerListComponent,
    CustomerSearchComponent,
    CaptinFormComponent,
    CaptinListComponent,
    CaptinSearchComponent,
    ClientComponent,
    ClientFormComponent,
    ClientListComponent,
    ClientSearchComponent,
    ClientBranchFormComponent,
    ClientBranchListComponent,
    ClientBranchSearchComponent,
    OrderListComponent,
    OrderCreateComponent,
    TicketAddNewComponent,
    VehicleFormComponent,
    VehicleListComponent,
    VehicleSearchComponent,
    OrderUpdateComponent,
    CaptinCreateComponent,
    CaptinUpdateComponent,
    ClientCreateComponent,
    ClientUpdateComponent,
    ClientBranchCreateComponent,
    ClientBranchUpdateComponent,
    OrderFlowComponent,
    OrderLogsComponent,
    DateConvertPipe,
    VehicleCreateComponent,
    VehicleUpdateComponent,
    CaptinEarningTimeComponent,
    OrderTrackingComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-left',
      preventDuplicates: true,
    }),
    NgxSpinnerModule,
    NgxPaginationModule,
    MatGridListModule,
    MatAutocompleteModule,
    MatInputModule,
    MatDialogModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatNativeDateModule,
    MatPaginator,
    MatSort,
    MatCardModule,
    MatIconModule,
    MatStepperModule,
    MatSelectModule,
    MatToolbarModule,
    MatSnackBarModule,
    NgxSpinnerModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
    GoogleMapsModule,
    MapDirectionsRenderer
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    DatePipe,
    DateConvertPipe,
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: loadGoogleMapsScript,
    //   deps: [PLATFORM_ID],
    //   multi: true
    // }
  ],
  exports:[
    DateConvertPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
