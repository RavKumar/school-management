import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MarksDialogComponent } from 'src/app/dialogs/marks-dialog/marks-dialog.component';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-marks',
  templateUrl: './marks.component.html',
  styleUrls: ['./marks.component.scss']
})
export class MarksComponent {
  displayedColumns: string[] = ['english', 'maths', 'science', 'envScience', 'social', 'physics', 'action']
  dataSource !: MatTableDataSource<any>

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(
    private dialog: MatDialog,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.getAllMarks();
  }

  openDialog() {
    this.dialog.open(MarksDialogComponent, {
      width: '30%'
    }).afterClosed().subscribe({
      next: (value) => {
        if(value === 'save') {
          this.getAllMarks();
        }
      },
      error: (err) => {
        return 'Error while fetching marks';
      }
    })
  }
  
  getAllMarks() {
    this.sharedService.getMarks().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        return 'No Records';
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editMarks(row: any) {
    this.dialog.open(MarksDialogComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe({
      next: (value) => {
        if(value === 'update') {
          this.getAllMarks()
        }
      },
      error: (err) => {
        return 'Error while fetching marks';
      }
    })
  }

  deleteMarks(id: number) {
    this.sharedService.deleteMarks(id).subscribe({
      next: (res) => {
        this.getAllMarks();
      },
      error: (err) => {
        return 'Error while deleting marks'
      }      
    })
  }
}
