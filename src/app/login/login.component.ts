import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';
import { ApiService } from '../api.service';
import { FormControl, Validator, Validators } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { AppComponent } from '../app.component';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('upDown', [
      state('down', style({
        top: "64px",
      })),
      state('up', style({
        top: "-220px",
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

export class LoginComponent implements OnInit {
  user = new User();
  users: User[] = [];
  show: boolean;
  status: boolean;

  constructor( private _route: Router, private apiService: ApiService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.show = false;
    setTimeout(() => this.show = true)
    this.apiService.getUsers().subscribe(users => this.users = users);
    this.apiService.currentStatus.subscribe(status => this.status = status);
  }

  register(): void {
    this.show = false;
    setTimeout(() => this._route.navigateByUrl('register'), 700);
  }

  login(): void {
    for (let user of this.users) {
      if(user.username === this.user.username) {
        if(user.password === this.user.password) {
          this.apiService.userLoggedIn = user;
          this.apiService.changeStatus(true);
          this.snackBar.dismiss();
          this.show = false;
          setTimeout(() => this._route.navigateByUrl('dashboard'), 700);
          // change here
        } else {
          break;
        }
      }
    }
    if(this.show == true) {
      this.snackBar.open("Incorrect username or password!", "OK", {duration: 5000,});
    }
  }

}
