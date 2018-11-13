import { Component, OnInit, ViewChild } from '@angular/core';
import { Team } from '../team';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['name', 'aveHelpful', 'aveResponsive', 'aveFriendly'];
  dataSource: MatTableDataSource<Team>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private apiService: ApiService,
    private route: Router
  ) { }

  ngOnInit() {
    this.getTeams();
  }

  getTeams(): void {
    this.apiService.getTeams().subscribe(teams => {
      this.dataSource = new MatTableDataSource(teams);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  goTeam(id: number) {
    this.route.navigateByUrl("/team/" + id);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
