import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteVehicleDtoModel, VehicleService } from '../../../../Service/Test Service/vehicle.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VehicleStateService } from '../../../../Service/Test Service/vehicle-state.service';
import { VehicleStateDtoModel } from '../../../../Models/VehicleState/VehicleState.Model';


@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrl: './vehicle-list.component.css'
})
export class VehicleListComponent {
  displayedColumns: string[] = ['name', 'number', 'owner', 'vehicleState', 'actions'];
  dialogRef: MatDialogRef<any> | undefined;
  // vehicleState = this.getVehicleState();
  vehicles = new MatTableDataSource<any>();
  deleteObj = new DeleteVehicleDtoModel;
  vehicleId!:string;
  searchObj = {};
  vehicleStates:VehicleStateDtoModel[]=[]
  totalNumberOfItems = 0;
  pageSize = 8;
  currentPage = 1;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('confirmDialog') confirmDialog!: TemplateRef<any>;

  constructor(private vehicleService:VehicleService, private vehicleStateService:VehicleStateService, private dialog: MatDialog, private snackBar: MatSnackBar){}

  ngOnInit(): void {
    this.loadVehicles();
    this.getVehicleState();
  }

  ngAfterViewInit() {
    this.vehicles.sort = this.sort;
  }

  getVehicleState(){
    this.vehicleStateService.getVehicleStateLite(this.searchObj).subscribe(
      (vehicleState: VehicleStateDtoModel[]) => {
        this.vehicleStates = vehicleState;
      },
      (error: any) => {
        console.error('Error fetching vehicles:', error);
      }
    );
  }

  // getStateLabel(stateValue: number): string {
  //   debugger;
  //   const state = this.vehicleState.find(s => s.value === stateValue);
  //   return state ? state.id : 'Unknown State';
  // }

  // getVehicleStates() {
  //   return Object.keys( this.vehicleStates)
  //     .filter(key => isNaN(Number(key)))
  //     .map(key => {
  //       const enumKey = key as keyof typeof  this.vehicleStates;
  //       return { id: key, name:  this.vehicleStates[enumKey] };
  //     });
  // }

  loadVehicles(currenttPage: number = 1, pageSize: number = this.pageSize): void {
    const input = {
      searchObj: null,
      criteria: {
        currentPage: currenttPage,
        pageSize: pageSize,
        expressionCombinationOperator: 1,
      },
    };
    this.vehicleService.getVehicles(input).subscribe((response: any) => {
      this.vehicles.data = response.data.items;
      this.totalNumberOfItems = response.data.pagerInfo.totalNumberOfItems;
      this.pageSize = response.data.pagerInfo.pageSize;
      this.currentPage = response.data.pagerInfo.currentPage;
    });
  }

  onPageChange(event: PageEvent) {
    const currentPage = event.pageIndex;
    const pageSize = event.pageSize;
    const newPage = currentPage + 1;
    this.loadVehicles(newPage, pageSize);
  }

  deleteVehicle(id: string): void {
    this.vehicleId = id;
    this.dialogRef = this.dialog.open(this.confirmDialog);
  }

  onDialogNoClick(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }


  onDialogYesClick(): void {
    this.deleteObj.deletedById = '8c037a32-68d7-4c38-913e-311ce44fa16e';
    this.deleteObj.id = this.vehicleId;
    if (this.dialogRef && this.vehicleId !== undefined) {
        this.vehicleService.deleteVehicle(this.deleteObj).subscribe(() => {
        this.loadVehicles();
        this.snackBar.open('Vehicle deleted', 'Close', { duration: 2000 });
        this.dialogRef?.close();
      });
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.vehicles.filter = filterValue.trim().toLowerCase();
    if (this.vehicles.paginator) {
      this.vehicles.paginator.firstPage();
    }
  }

}
