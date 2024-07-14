import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ClientService } from '../../../../Service/Test Service/client.service';
import { DeleteClientModel } from '../../../../Models/Client/Client.Model';
import { DataServiceService } from '../../../../Service/Shared/DataService.Service';
import { ClientStateEnum } from '../../../../Enum/ClientState.Enum';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.css'
})
export class ClientListComponent implements OnInit, AfterViewInit{
  displayedColumns: string[] = ['clientName', 'clientEmail', 'clientState', 'clientMobil', 'branch', 'actions'];
  dialogRef: MatDialogRef<any> | undefined;
  clientStates = this.getClientStates();
  clientId!: string ;
  clients = new MatTableDataSource<any>();
  deleteObj = new DeleteClientModel;
  searchObj = {};
  totalNumberOfItems = 0;
  pageSize = 8;
  currentPage = 1;

  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('confirmDialog') confirmDialog!: TemplateRef<any>;

  constructor(private clientService: ClientService, private dialog: MatDialog, private snackBar: MatSnackBar, private _dataServiceService:DataServiceService) {}

  ngOnInit(): void {
    this.loadClients();
  }

  ngAfterViewInit():void {
    // this.clients.paginator = this.paginator;
    this.clients.sort = this.sort;
  }

  loadClients(currenttPage: number = 1, pageSize: number = this.pageSize): void {
    const input = {
      searchObj: {},
      criteria: {
        currentPage: currenttPage,
        pageSize: pageSize,
        expressionCombinationOperator: 1,
      },
    };
    this.clientService.getClients(input).subscribe((response: any) => {
      this.clients.data = response.data.items;
      this.totalNumberOfItems = response.data.pagerInfo.totalNumberOfItems;
      this.pageSize = response.data.pagerInfo.pageSize;
      this.currentPage = response.data.pagerInfo.currentPage;
    });
  }

  getClientStates() {
    return Object.keys(ClientStateEnum)
      .filter(key => isNaN(Number(key)))
      .map(key => {
        const enumKey = key as keyof typeof ClientStateEnum;
        return { label: key, value: ClientStateEnum[enumKey] };
      });
  }

  getStateLabel(stateValue: number): string {
    const state = this.clientStates.find(s => s.value === stateValue);
    return state ? state.label : 'Unknown State';
  }

  onPageChange(event: PageEvent) {
    const currentPage = event.pageIndex;
    const pageSize = event.pageSize;
    const newPage = currentPage + 1;
    this.loadClients(newPage, pageSize);
  }

  deleteClient(id: string): void {
    this.clientId = id;
    this.dialogRef = this.dialog.open(this.confirmDialog);
  }

  onDialogNoClick(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  onDialogYesClick(): void {
    this.deleteObj.deletedById = '8c037a32-68d7-4c38-913e-311ce44fa16e';
    this.deleteObj.id = this.clientId;
    if (this.dialogRef && this.clientId !== undefined) {
        this.clientService.deleteClient(this.deleteObj).subscribe(() => {
        this.loadClients();
        this.snackBar.open('Client deleted', 'Close', { duration: 2000 });
        this.dialogRef?.close();
      });
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.clients.filter = filterValue.trim().toLowerCase();
    if (this.clients.paginator) {
      this.clients.paginator.firstPage();
    }
  }


}
