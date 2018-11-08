import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { MatSnackBar } from '@angular/material';
import { Team } from '../team';
import { Rating } from '../rating';
import { User } from '../user';
@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.scss']
})
export class RateComponent implements OnInit {
  rating: Rating = new Rating;
  teams: Team[] = [];
  selectedTeam: string;
  helpful: number;
  responsive: number;
  friendly: number;
  team: Team;

  constructor(
    private _route: Router,
    private location: Location,
    private apiService: ApiService,
    public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getTeams();
  }

  getTeams(): void {
    this.apiService.getTeams()
      .subscribe(teams => this.teams = teams);
  }

  cancel(): void {
    this.location.back();
  }

  rate(): void {
    this.rating.team = this.selectedTeam;
    this.rating.helpful = this.helpful;
    this.rating.responsive = this.responsive;
    this.rating.friendly = this.friendly;
    this.rating.user = this.apiService.userLoggedIn.id;
    this.apiService.addRating(this.rating)
      .subscribe(rating => {
        this.rating = rating;
        this.apiService.updateUser(this.apiService.userLoggedIn)
        .subscribe(user => this.apiService.userLoggedIn.rating.push(this.rating.id))
        for (let team of this.teams) {
          if (team.name == this.selectedTeam) {
            this.team = team;
            break;
          }
        }
        this.team.rating.push(rating.id);
        this.apiService.updateTeam(this.team)
          .subscribe(team => this._route.navigateByUrl("dashboard"));

    });




  }
}
