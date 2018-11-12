import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { MatSnackBar } from '@angular/material';
import { Team } from '../team';
import { Rating } from '../rating';
@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.scss']
})
export class RateComponent implements OnInit {
  rating: Rating = new Rating;
  teams: Team[] = [];
  selectedTeam: string;
  helpful: number = 3;
  responsive: number = 3;
  friendly: number = 3;
  aveHelpful: number = 0;
  aveResponsive: number = 0;
  aveFriendly: number = 0;
  team: Team;

  total: number = 0;

  constructor(
    private _route: Router,
    private route: ActivatedRoute,
    private location: Location,
    private apiService: ApiService,
    public snackBar: MatSnackBar) { }

  ngOnInit() {
    const id =+ this.route.snapshot.paramMap.get('id');
    if (id != this.apiService.numOfRatings) {
      this.apiService.getRating(id)
      .subscribe(rating => {
        this.rating = rating;
        this.selectedTeam = rating.team;
        this.apiService.getTeamByName(this.selectedTeam)
          .subscribe(team => this.teams.push(team[0]));
        this.helpful = rating.helpful;
        this.responsive = rating.responsive;
        this.friendly = rating.friendly;
      })
    }
    else {
      this.getTeams();
    }

  }

  getTeams(): void {
    this.apiService.getTeams()
      .subscribe(teams => {
        for (let rate of this.apiService.userLoggedIn.rating) {
          this.apiService.getRating(rate)
            .subscribe(rate => {
              teams = teams.filter(t => t.name !== rate.team);
              this.teams = teams;
            });
        }
      });
  }

  cancel(): void {
    this.location.back();
  }

  rate(): void {
    this.rating.team = this.selectedTeam;
    this.rating.helpful = this.helpful;
    this.rating.responsive = this.responsive;
    this.rating.friendly = this.friendly;
    console.log(this.rating.id)
    console.log(this.apiService.numOfRatings)
    if (this.rating.id) {
      console.log("edit rating")
      this.apiService.updateRating(this.rating)
        .subscribe();
      this.apiService.getTeamByName(this.selectedTeam)
        .subscribe(team => {
          this.team = team[0];
          for(let rating of this.team.rating) {
            this.apiService.getRating(rating)
              .subscribe(rating => {
                this.aveHelpful += rating.helpful;
                this.aveResponsive += rating.responsive;
                this.aveFriendly += rating.friendly;
              })
          }
          setTimeout(() => {
            this.team.aveHelpful = this.aveHelpful / this.team.rating.length;
            this.team.aveResponsive = this.aveResponsive / this.team.rating.length;
            this.team.aveFriendly = this.aveFriendly / this.team.rating.length;
            this.apiService.updateTeam(this.team)
              .subscribe(team => this._route.navigateByUrl("dashboard"));
          }, 500)

        })
    } else {
      console.log("new Rating")
      this.rating.user = this.apiService.userLoggedIn.id;
      this.apiService.addRating(this.rating)
        .subscribe(rating => {
          this.apiService.userLoggedIn.rating.push(rating.id);
          this.apiService.updateUser(this.apiService.userLoggedIn)
          .subscribe()
          this.apiService.getTeamByName(this.selectedTeam)
            .subscribe(team => {

              this.team = team[0];
              this.team.rating.push(rating.id);

              this.total = this.team.aveHelpful * (this.team.rating.length - 1);
              this.team.aveHelpful = (this.total + rating.helpful) / this.team.rating.length;

              this.total = this.team.aveResponsive * (this.team.rating.length - 1);
              this.team.aveResponsive = (this.total + rating.responsive) / this.team.rating.length;

              this.total = this.team.aveFriendly * (this.team.rating.length - 1);
              this.team.aveFriendly = (this.total + rating.friendly) / this.team.rating.length;
              this.apiService.updateTeam(this.team)
                .subscribe(team => this._route.navigateByUrl("dashboard"));
            });
      this.apiService.numOfRatings++;
      });
    }
  }
}
