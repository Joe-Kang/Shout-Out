import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../user';
import { Team } from '../team';
import { Rating } from '../rating';
import { ApiService } from '../api.service';
import { MatTableDataSource, MatSort, MatPaginator, MatTab } from '@angular/material';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'rating'];
  dataSource: MatTableDataSource<Team>;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private apiService: ApiService) {

  }

  ngOnInit() {
    this.getTeams();
  }

  ngAfterViewInit() {
    setTimeout(() =>this.dataSource.paginator = this.paginator, 500);
    setTimeout(() =>this.dataSource.sort = this.sort, 500);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getTeams(): void {
    this.apiService.getTeams()
      .subscribe(teams => this.dataSource = new MatTableDataSource(teams));
  }


}
