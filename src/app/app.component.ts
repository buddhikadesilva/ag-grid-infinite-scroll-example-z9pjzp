import { Component, HostListener, Input, ViewChild } from '@angular/core';
import { GridOptions, IDatasource, IGetRowsParams, ColDef } from 'ag-grid';
import { AgGridNg2 } from 'ag-grid-angular';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public columnDefs: any[];
  public rowData: any[];
  public gridOptions: any;
  public info: string;
  @ViewChild('grid') grid: AgGridNg2;

  constructor() {
    this.columnDefs = [
      { headerName: 'One', field: 'one' },
      { headerName: 'Two', field: 'two' },
      { headerName: 'Three', field: 'three' }
    ];

    this.gridOptions = {
      rowSelection: 'single',
      cacheBlockSize: 100,
      maxBlocksInCache: 2,
      enableServerSideFilter: false,
      enableServerSideSorting: false,
      rowModelType: 'infinite',
     // pagination: false, 
     // paginationAutoPageSize: true
    };

  }


    private getRowData(startRow: number, endRow: number): Observable<any[]> {
      // This is acting as a service call that will return just the
      // data range that you're asking for.
      var rowdata = [];
      for (var i = startRow; i <= endRow; i++) {
        rowdata.push({ one: "hello", two: "world", three: "Item " + i });
      }
      return Observable.of(rowdata);
    }

    onGridReady(params: any) {
      console.log("onGridReady");
      var datasource = {
        getRows: (params: IGetRowsParams) => {
          this.info = "Getting datasource rows, start: " + params.startRow + ", end: " + params.endRow;
        
          this.getRowData(params.startRow, params.endRow)
                    .subscribe(data => params.successCallback(data));
          
        }
      };
      params.api.setDatasource(datasource);

    }

}
