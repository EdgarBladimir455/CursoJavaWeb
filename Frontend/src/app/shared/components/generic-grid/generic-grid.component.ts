import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

export class Pagination {
  length: number;
  pageIndex: number;
  pageSize: number;
  previousPageIndex: number;

  constructor() {
  }
}

@Component({
  selector: 'app-generic-grid',
  templateUrl: './generic-grid.component.html',
  styleUrls: ['./generic-grid.component.scss']
})
export class GenericGridComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @Input()
  public dataSource: any[] = [];
  @Input()
  public totalCount = 0;
  @Input()
  public displayedColumns: string[] = [];
  @Input()
  public displayedHeaders: string[] = [];
  @Input()
  public idRowSelector = '';

  @Output()
  public deleteEvent: EventEmitter<number> = new EventEmitter();
  @Output()
  public editEvent: EventEmitter<number> = new EventEmitter();
  @Output()
  public updateDataRequestEvent: EventEmitter<Pagination> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  getCellValue(row, selector: string) {
    const multiSelectors = selector.split('.');

    if (multiSelectors.length > 1) {
      let actualValue = row;
      for (const select0r of multiSelectors) {
        actualValue = actualValue[select0r];
      }
      return actualValue;
    }
    return row[selector];
  }

  delete(row) {
    const cellValue = this.getCellValue(row, this.idRowSelector);
    this.deleteEvent.emit(cellValue);
  }

  edit(row) {
    const cellValue = this.getCellValue(row, this.idRowSelector);
    this.editEvent.emit(cellValue);
  }

  updateDataRequest(pagination) {
    this.updateDataRequestEvent.emit(pagination);
  }

}
