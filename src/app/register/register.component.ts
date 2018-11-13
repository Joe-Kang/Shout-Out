import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { User } from '../user';
import { ApiService } from '../api.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [
    trigger('upDown', [
      state('down', style({
        top: "64px"
      })),
      state('up', style({
        top: "-275px",
        "z-index": "0"
      })),
      transition('down => up', [
        animate('0.7s')
      ]),
      transition('up => down', [
        animate('0.7s')
      ]),
    ]),
  ],
})
export class RegisterComponent implements OnInit {
  user = new User();
  users: User[] = [];
  result: string;
  status: boolean;
  validUsername: boolean = true;
  constructor(
    private _route: Router,
    private location: Location,
    private apiService: ApiService,
    public snackBar: MatSnackBar
    ) { }

  show: boolean;

  ngOnInit() {
    this.show = false;
    setTimeout(() => this.show = true)
    this.apiService.currentStatus.subscribe(status => this.status = status);
    this.apiService.getUsers().subscribe(users => this.users = users);
  }

  register(): void {
    for (let user of this.users) {
      if(this.user.username === user.username) {
        this.snackBar.open("Username already registered!", "OK", {duration: 5000,});
        this.validUsername = false;
        break;
      }
    }
    if (this.validUsername === true) {
      this.validUsername = false;
      this.user.rating = [];
      this.user.firstname = this.toTitleCase(this.user.firstname);
      this.user.lastname = this.toTitleCase(this.user.lastname);
      this.apiService.addUser(this.user).subscribe(user => this.apiService.userLoggedIn = user);
      this.apiService.changeStatus(true)
      this.snackBar.dismiss();
      this.show = false;
      setTimeout(() => this._route.navigateByUrl('dashboard'), 700);
    }
    this.validUsername = true;
  }

  cancel(): void {
    this.show = false;
    setTimeout(() => this.location.back(), 700);
  }

  toTitleCase(str: String) {
    return str.replace(
        /\w\S*/g,
        function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}
}
