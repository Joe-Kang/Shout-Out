import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../user';
import { Team } from '../team';
import { Rating } from '../rating';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { MatTableDataSource, MatSort, MatPaginator, MatTab } from '@angular/material';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User;
  userRatings: Rating[] = [];

  displayedColumns: string[] = ['id', 'team', 'helpful', 'responsive', 'friendly'];
  dataSource: MatTableDataSource<Rating>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.user = this.apiService.userLoggedIn;

    this.getUserRatings();
    this.dataSource = new MatTableDataSource(this.userRatings);
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

  getUserRatings() {
    for (var i = 0; i < this.user.rating.length; i++) {
      this.apiService.getRating(this.user.rating[i])
        .subscribe(rating => this.userRatings.push(rating));
    }
  }



}
