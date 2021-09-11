import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { GridOptions, IGetRowsParams } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {
  @ViewChild('myGrid') myGrid: AgGridAngular

  gridOptions: Partial<GridOptions>;
  gridApi;
  gridColumnApi;
  columnDefs;
  cacheOberfloeSize;
  maxConcurrentDatasourceRequests;
  infiniteInitialRowCount;

  rowData: any[] = [];
  defaultColDef: any;
  rowSelection;
  rowGroupPanelShow;
  pivotPanelShow;
  rowHeight = 90;
  pageSize = 6;
  sub: any;
  constructor(private ds: DataService) {
    this.columnDefs = [
      { field: 'id', sortable: true },
      { field: 'email', sortable: true },
      { field: 'first_name', sortable: true },
      { field: 'last_name', sortable: true },
      {
        field: 'avatar', cellRenderer: function (params) {
          return '<span><img src="' + params.value + '" height="100" width="100"/></span>'
        }
      }
    ];
    this.defaultColDef = {
      editable: true,
      enableRowGroup: true,
      enablePivot: true,
      enableValue: true,
      sortable: true,
      resizable: true,
      filter: true,
      flex: 1,
      minWidth: 100,
    };
    this.rowSelection = 'multiple';
    this.rowGroupPanelShow = 'always';
    this.pivotPanelShow = 'always';

    this.cacheOberfloeSize = 2;
    this.maxConcurrentDatasourceRequests = 2;
    this.infiniteInitialRowCount = 2;
    this.gridOptions = {
      headerHeight: 45,
      rowHeight: 30,
      cacheBlockSize: 6,
      paginationPageSize: 6,
      rowModelType: 'infinite'
    }
    // this.getAllUsersData();
  }

  onGridReady(params) {
    console.log('On grid ready');
    this.gridApi = params.api;
    this.gridColumnApi = params.gridColumnApi;
    var dataSource = {
      getRows: (params: IGetRowsParams) => {
        const page = params.endRow / this.pageSize;
        this.sub = this.ds.getUsersApiData(params, page).subscribe(
          data => params.successCallback(data['data'], data['total'])
        );
      }
    }

    this.gridApi.setDatasource(dataSource);
  }

  onPaginationChanged(event: any) {

  }

  ngOnInit(): void {

  }

  

  getAllUsersData() {
    this.sub = this.ds.getUsersApiData1().subscribe(data => {
      console.log("from api", data['data']);
      this.pageSize = data['per_page'];
      this.rowData = data['data'];
    });
    console.log("API data", this.rowData);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }



}
