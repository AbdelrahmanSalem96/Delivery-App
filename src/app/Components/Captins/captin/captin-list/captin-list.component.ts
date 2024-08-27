import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Captin, CaptinService } from '../../../../Service/Test Service/captin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteCaptinDtoModel } from '../../../../Models/Captin/Captin.Model';
import { CaptinStateEnum } from '../../../../Enum/CaptinStete.Enum';
import { PriorityAssignEnum } from '../../../../Enum/PriorityAssign.Enum';

@Component({
  selector: 'app-captin-list',
  templateUrl: './captin-list.component.html',
  styleUrl: './captin-list.component.css'
})
export class CaptinListComponent implements AfterViewInit{
  // displayedColumns: string[] = ['captainName', 'captainEmail', 'captinState', 'captainMobile','priorityAssign', 'activationState', 'employmentType', 'commissionRule', 'createdOn','area','actions'];
  displayedColumns: string[] = ['captainName', 'captainEmail', 'captinState', 'captainMobile','priorityAssign', 'activationState', 'employmentType', 'commissionRule', 'createdOn','actions'];
  dialogRef: MatDialogRef<any> | undefined;
  captinStates = this.getCaptinStates();
  priorityAssignStates = this.getpriorityAssign();
  captinId!: string;
  captins = new MatTableDataSource<any>();
  deleteObj = new DeleteCaptinDtoModel;
  searchObj = {};
  totalNumberOfItems = 0;
  pageSize = 8;
  currentPage = 1;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('confirmDialog') confirmDialog!: TemplateRef<any>;

  constructor(private captinService: CaptinService, private dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadCaptins();
  }

  ngAfterViewInit():void {
    this.captins.sort = this.sort;
  }

  getStateLabel(stateValue: number): string {
    const state = this.captinStates.find(s => s.value === stateValue);
    return state ? state.label : 'Unknown State';
  }

  getCaptinStates() {
    return Object.keys(CaptinStateEnum)
      .filter(key => isNaN(Number(key)))
      .map(key => {
        const enumKey = key as keyof typeof CaptinStateEnum;
        return { label: key, value: CaptinStateEnum[enumKey] };
      });
  }

  getPriorityAssignState(stateValue: number): string {
    const state = this.priorityAssignStates.find(s => s.value === stateValue);
    return state ? state.label : 'Unknown State';
  }

  getpriorityAssign() {
    return Object.keys(PriorityAssignEnum)
      .filter(key => isNaN(Number(key)))
      .map(key => {
        const enumKey = key as keyof typeof PriorityAssignEnum;
        return { label: key, value: PriorityAssignEnum[enumKey] };
      });
  }

  loadCaptins(currenttPage: number = 1, pageSize: number = this.pageSize): void {
    const input = {
      searchObj: {},
      criteria: {
        currentPage: currenttPage,
        pageSize: pageSize,
        expressionCombinationOperator: 1,
      },
    };
    this.captinService.getCaptins(input).subscribe((response: any) => {
      if(response.data != null){
        this.captins.data = response.data.items;
        this.totalNumberOfItems = response.data.pagerInfo.totalNumberOfItems;
        this.pageSize = response.data.pagerInfo.pageSize;
        this.currentPage = response.data.pagerInfo.currentPage;
      }
    });
  }

  onPageChange(event: PageEvent) {
    const currentPage = event.pageIndex;
    const pageSize = event.pageSize;
    const newPage = currentPage + 1;
    this.loadCaptins(newPage, pageSize);
  }

  deleteCaptin(id: string): void {
    this.captinId = id;
    this.dialogRef = this.dialog.open(this.confirmDialog);
  }

  onDialogNoClick(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }


  onDialogYesClick(): void {
    this.deleteObj.deletedById = '8c037a32-68d7-4c38-913e-311ce44fa16e';
    this.deleteObj.id = this.captinId;
    if (this.dialogRef && this.captinId !== undefined) {
        this.captinService.deleteCaptin(this.deleteObj).subscribe(() => {
        this.loadCaptins();
        this.snackBar.open('Client deleted', 'Close', { duration: 2000 });
        this.dialogRef?.close();
      });
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.captins.filter = filterValue.trim().toLowerCase();
    if (this.captins.paginator) {
      this.captins.paginator.firstPage();
    }
  }

}
