import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { Team } from '../team';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  users: User[] = []
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.apiService.getUsers()
      .subscribe(users => this.users = users);
  }

}
