import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { CreateAssetComponent } from '../create-asset/create-asset.component';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { EditAssetComponent } from '../edit-asset/edit-asset.component';
import { ConfirmationDialogComponent } from './confirmation.component';

@Component({
  selector: 'app-assets-table',
  templateUrl: './assets-table.component.html',
  styleUrls: ['./assets-table.component.scss']
})


export class AssetsTableComponent implements OnInit {

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;



  displayedColumns!: any[];
  dataSource!: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);



  tableColumns: any[] = [
    {
      key: "select",
      label: "Select",
      order: 1,
      columnWidth: "2%",
      cellStyle: "width: 100%",
      sortable: false
    },
    {
      key: "image",
      label: "Image",
      order: 2,
      columnWidth: "5%",
      cellStyle: "width: 100%",
      sortable: false
    },
    {
      key: "firstName",
      label: "FirstName",
      order: 1,
      columnWidth: "8%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "lastName",
      label: "Last Name",
      order: 3,
      columnWidth: "8%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "email",
      label: "Email",
      order: 4,
      columnWidth: "12%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "admin",
      label: "Admin",
      order: 5,
      columnWidth: "8%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "approved",
      label: "Approved",
      order: 5,
      columnWidth: "8%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "actions",
      label: "Actions",
      order: 10,
      columnWidth: "10%",
      cellStyle: "width: 100%",
      sortable: true
    }

  ]

  employeeData : any[] = [


  ]
  userList: any;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private userService: UserService,
    ) {   }

  ngOnInit(): void {
    // this.userService.getUsers();

    this.userService.data$.subscribe((data) => {


    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort = this.sort;
    });
    this.getPageData();
    this.displayedColumns = this.tableColumns.map(column => column.label);
    this.dataSource = new MatTableDataSource(this.employeeData);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  addNewAsset() {
    const dialogRef = this.dialog.open(CreateAssetComponent, {
      width: '40%',
      height: 'auto',
    });
  }
  editUser(info: any) {

    const dialogRef = this.dialog.open(EditAssetComponent, {
      width: '40%',
      height: 'auto',
      data: { id: info._id }
    });
  }

  getUserId(): string | null {
    return sessionStorage.getItem('userId');
  }


   deleteUser(info: any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Confirm Action',
        message: 'Are you sure you want to perform this action?',
      }})

      dialogRef.afterClosed().subscribe(async (result) => {
        if (result === true) {
          await this.userService.deleteUser(info._id).toPromise();
          this.userList =  await this.userService.getUsers().toPromise();
          this.userService.setData(this.userList['data']);
        }
      });
    }

  getPageData = async () => {
    this.userList = await this.userService.getUsers().toPromise();

    this.dataSource = new MatTableDataSource(this.userList['data']);
    this.dataSource.sort = this.sort;
  }


}
