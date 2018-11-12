import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../user';
import { Team } from '../team';
import { Rating } from '../rating';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User;
  userRatings: Rating[] = [];
  team: Team;
  totalHelpful: number = 0;
  totalResponsive: number = 0;
  totalFriendly: number = 0;
  displayedColumns: string[] = ['team', 'helpful', 'responsive', 'friendly', 'options'];
  dataSource: MatTableDataSource<Rating>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = this.apiService.userLoggedIn;
    if (this.user.rating) {
      this.getUserRatings();
      this.dataSource = new MatTableDataSource(this.userRatings);
    }
  }

  ngAfterViewInit() {
    if (this.user.rating) {
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, 500);
    }
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getUserRatings(): void {
    for (var i = 0; i < this.user.rating.length; i++) {
      this.apiService.getRating(this.user.rating[i])
        .subscribe(rating => this.userRatings.push(rating));
    }
  }

  deleteRating(rating: Rating): void {
    // Remove rating ID from user
    this.user.rating = this.user.rating.filter(r => r !== rating.id);
    this.apiService.userLoggedIn = this.user;
    this.apiService.updateUser(this.user).subscribe();

    // Remove rating from list
    this.userRatings = this.userRatings.filter(r => r !== rating);
    this.dataSource = new MatTableDataSource(this.userRatings);

    // Remove rating from team and update averages
    this.apiService.getTeamByName(rating.team).subscribe(team => {
      this.team = team[0];
      this.team.rating = this.team.rating.filter(r => r !== rating.id);
      if (this.team.rating.length == 0) {
        this.team.aveHelpful = 0;
        this.team.aveFriendly = 0;
        this.team.aveResponsive = 0;
        this.apiService.updateTeam(this.team).subscribe();
      } else {
        for (let rating of this.team.rating) {
          this.apiService.getRating(rating)
            .subscribe(rate => {
              this.totalHelpful += rate.helpful;
              this.totalResponsive += rate.responsive;
              this.totalFriendly += rate.friendly;
            })
        }
        setTimeout(() =>{
          this.team.aveHelpful = this.totalHelpful / this.team.rating.length;
          this.team.aveResponsive = this.totalResponsive / this.team.rating.length;
          this.team.aveFriendly = this.totalFriendly / this.team.rating.length;
          this.apiService.updateTeam(this.team).subscribe();
        }, 500)
      }

    });

    // Delete rating
    this.apiService.deleteRating(rating).subscribe();
    this.apiService.numOfRatings--;
  }

  editRating(id: number) {
    this.router.navigateByUrl("/rate/" + id);
  }

  goTeam(name: string): void {
    this.apiService.getTeamByName(name)
      .subscribe(team => this.router.navigateByUrl("/team/" + team[0].id));
  }
}
