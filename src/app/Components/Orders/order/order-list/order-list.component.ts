import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  PLATFORM_ID,
  OnInit,
  TemplateRef,
  ViewChild,
  OnDestroy,
  Inject,
  NgZone,
  AfterContentChecked,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {
  Order,
  OrderService,
} from '../../../../Service/Test Service/order.service';
import { isPlatformBrowser } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription, interval } from 'rxjs';
import { OrderStateEnum } from '../../../../Enum/OrderStete.Enum';
import { SafeHtml } from '@angular/platform-browser';
import { AuthService } from '../../../../Service/Test Service/auth.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css',
})
export class OrderListComponent
  implements OnInit, AfterViewInit, AfterContentChecked, OnDestroy
{
  public timer: number = 0;
  selectedClientBranchState!: OrderStateEnum;
  orderLastStates = this.getOrderStates();

  displayedColumns: string[] = [
    'orderCode',
    'clientName',
    'branchName',
    'orderPice',
    'captainName',
    'lastUpdatedOn',
    'orderLastState',
    'elapsedTime',
    'actions',
  ];

  orders = new MatTableDataSource<any>();
  private subscriptions: Subscription = new Subscription();
  private isBrowser!: boolean;
  searchObj = {};
  totalNumberOfItems = 0;
  pageSize = 100;
  currentPage = 1;
  userId!: any;
  userRole!: any;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('confirmDialog') confirmDialog!: TemplateRef<any>;

  constructor(
    private orderService: OrderService,
    private authService:AuthService,
    private cdref: ChangeDetectorRef,
    private ngZone: NgZone,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.userRole = this.authService.getRole();

    this.loadOrders();
    if (this.isBrowser) {
      this.ngZone.runOutsideAngular(() => {
        this.startElapsedTimeUpdater();
      });
    }
  }

  ngAfterViewInit(): void {
    // this.orders.paginator = this.paginator;
    this.orders.sort = this.sort;
  }

  ngAfterContentChecked(): void {
    this.cdref.detectChanges();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  getStateLabel(stateValue: number): string {
    const state = this.orderLastStates.find(s => s.value === stateValue);
    return state ? state.label : 'Unknown State';
  }

  getOrderStates() {
    return Object.keys(OrderStateEnum)
      .filter(key => isNaN(Number(key)))
      .map(key => {
        const enumKey = key as keyof typeof OrderStateEnum;
        const formattedLabel = key.replace(/([a-z])([A-Z])/g, '$1 $2');
        return { label: formattedLabel, value: OrderStateEnum[enumKey] };
      });
  }

  getStateClass(orderLastState: number): string {
    switch (orderLastState) {
      case OrderStateEnum.Created:
        return 'state-created';
      case OrderStateEnum.FailedToAssign:
        return 'state-failed-to-assign';
      case OrderStateEnum.Assigned:
        return 'state-assigned';
      case OrderStateEnum.Accepted:
        return 'state-accepted';
      case OrderStateEnum.CaptainRejected:
        return 'state-captain-rejected';
      case OrderStateEnum.StartRide:
        return 'state-start-ride';
      case OrderStateEnum.ReachedShop:
        return 'state-reached-shop';
      case OrderStateEnum.OrderPicked:
        return 'state-order-picked';
      case OrderStateEnum.Shipped:
        return 'state-shipped';
      case OrderStateEnum.ReachedLocation:
        return 'state-reached-location';
      case OrderStateEnum.CustomerRejected:
        return 'state-customer-rejected';
      case OrderStateEnum.CustomerChangeLocation:
        return 'state-customer-change-location';
      case OrderStateEnum.Delivered:
        return 'state-delivered';
      case OrderStateEnum.Canceled:
        return 'state-canceled';
      default:
        return '';
    }
  }

  loadOrders(currenttPage: number = 1, pageSize: number = this.pageSize): void {
    let input = {};
    if(this.userRole === 'ClientBranch'){
      input= {
        searchObj: {
          "branchId":this.userId
        },
        criteria: {
          currentPage: currenttPage,
          pageSize: pageSize,
          expressionCombinationOperator: 1,
        },
      };
    } else if(this.userRole === "Client") {
      input= {
        searchObj: {
          "clientId":this.userId
        },
        criteria: {
          currentPage: currenttPage,
          pageSize: pageSize,
          expressionCombinationOperator: 1,
        },
      };
    }else{
      input= {
        searchObj: {},
        criteria: {
          currentPage: currenttPage,
          pageSize: pageSize,
          expressionCombinationOperator: 1,
        },
      };
    }
    this.orderService.getOrdersPageView(input).subscribe((response: any) => {
      this.orders.data = response.data.items;
      this.totalNumberOfItems = response.data.pagerInfo.totalNumberOfItems;
      this.pageSize = response.data.pagerInfo.pageSize;
      this.currentPage = response.data.pagerInfo.currentPage;
    });
  }

  onPageChange(event: PageEvent) {
    const currentPage = event.pageIndex;
    const pageSize = event.pageSize;
    const newPage = currentPage + 1;
    this.loadOrders(newPage, pageSize);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.orders.filter = filterValue.trim().toLowerCase();
    if (this.orders.paginator) {
      this.orders.paginator.firstPage();
    }
  }

  getElapsedTime(order: Order): SafeHtml {
    return this.orderService.getElapsedTime(order);
  }

  private startElapsedTimeUpdater() {
    const elapsedTimeUpdater = interval(60000).subscribe(() => {
      this.ngZone.run(() => {
        // Manually trigger change detection
        this.cdref.markForCheck();
      });
    });
    this.subscriptions.add(elapsedTimeUpdater);
  }
}
