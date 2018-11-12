import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from '../team';
import { Rating } from '../rating';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  team$: Observable<Team>;
  teamRatings: Rating[] = [];
  selectedTeam: Team;

  displayedColumns: string[] = ["id", "helpful", "responsive", "friendly"];
  dataSource: MatTableDataSource<Rating>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private route: ActivatedRoute, private apiService: ApiService,) { }

  ngOnInit() {
    this.getTeam();
  }

  getTeam(): void {
    const id =+ this.route.snapshot.paramMap.get('id');
    this.team$ = this.apiService.getTeam(id);
    this.apiService.getTeam(id).subscribe(team => {
      this.selectedTeam = team;
      this.getTeamRatings();
    });
  }

  getTeamRatings(): void {
    for (var i = 0; i < this.selectedTeam.rating.length; i++) {
      this.apiService.getRating(this.selectedTeam.rating[i])
        .subscribe(rating => {
          this.teamRatings.push(rating)
        });
    }
    setTimeout(()=> {
      this.dataSource = new MatTableDataSource(this.teamRatings);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 500);
  }
}
