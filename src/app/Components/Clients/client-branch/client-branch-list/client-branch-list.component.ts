import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ClientBranchModel, DeleteBranchModel } from '../../../../Models/Client Branch/ClientBranch.Model';
import { ClientBranchService } from '../../../../Service/Test Service/client-branch.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SearchObj } from '../../../../Core/SearchControls/Common/SearchObj';
import { ClientBranchStateEnum } from '../../../../Enum/ClientBranchState.Enum';
import { ClientBranchState } from '../client-branch-create/client-branch-create.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-client-branch-list',
  templateUrl: './client-branch-list.component.html',
  styleUrl: './client-branch-list.component.css'
})
export class ClientBranchListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['clientBranchName', 'clientBranchEmail', 'clientBranchState', 'clientBranchMobil', 'actions'];
  dialogRef: MatDialogRef<any> | undefined;
  branchId!: string;
  branches = new MatTableDataSource<ClientBranchModel>();
  clientId!:string;
  searchObj = {};
  deleteObj = new DeleteBranchModel;
  selectedClientBranchState!: ClientBranchStateEnum;
  clientBranchStates = this.getClientBranchStates();
  totalNumberOfItems = 0;
  pageSize = 8;
  currentPage = 1;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('confirmDialog') confirmDialog!: TemplateRef<any>;

  constructor(
    private clientBranchService: ClientBranchService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    let idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
      this.clientId = idParam;
      this.loadClientBranches();
    } else {
      // Handle the error or navigate away if the id is null
      this.snackBar.open('No Branches Found', 'Close', { duration: 2000 });
    }
  }

  ngAfterViewInit(): void {
    this.branches.sort = this.sort;
  }

  loadClientBranches(currenttPage: number = 1, pageSize: number = this.pageSize): void {
    const input = {
      searchObj: {
        "clientId":this.clientId
      },
      criteria: {
        currentPage: currenttPage,
        pageSize: pageSize,
        expressionCombinationOperator: 1,
      },
    };
    this.clientBranchService.getClientBranches(input).subscribe((response: any) => {
      if(response.data == null){
        this.snackBar.open('No Branches Found', 'Close', { duration: 2000 });
      }else {
        this.branches.data = response.data.items;
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
    this.loadClientBranches(newPage, pageSize);
  }

  getStateLabel(stateValue: number): string {
    const state = this.clientBranchStates.find(s => s.value === stateValue);
    return state ? state.label : 'Unknown State';
  }

  getClientBranchStates() {
    return Object.keys(ClientBranchStateEnum)
      .filter(key => isNaN(Number(key)))
      .map(key => {
        const enumKey = key as keyof typeof ClientBranchStateEnum;
        return { label: key, value: ClientBranchStateEnum[enumKey] };
      });
  }

  deleteClientBranch(id: string): void {
    this.branchId = id;
    this.dialogRef = this.dialog.open(this.confirmDialog);
  }

  onDialogNoClick(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  onDialogYesClick(): void {
    this.deleteObj.deletedById = '8c037a32-68d7-4c38-913e-311ce44fa16e';
    this.deleteObj.id = this.branchId
    if (this.dialogRef && this.branchId !== undefined) {
      this.clientBranchService.deleteClientBranch(this.deleteObj).subscribe(() => {
        this.loadClientBranches();
        this.snackBar.open('Branch deleted', 'Close', { duration: 2000 });
        this.dialogRef?.close();
      });
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.branches.filter = filterValue.trim().toLowerCase();
    if (this.branches.paginator) {
      this.branches.paginator.firstPage();
    }
  }

}

