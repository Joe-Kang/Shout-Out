import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { User } from '../user';
import { ApiService } from '../api.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [
    trigger('upDown', [
      state('down', style({
        top: "58px"
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
  result: string;
  constructor(
    private _route: Router,
    private location: Location,
    private apiService: ApiService
    ) { }

  show: boolean;

  ngOnInit() {
    this.show = false;
    setTimeout(() => this.show = true)
  }

  register(): void {
    this.user.rating;
    this.apiService.userLoggedIn = this.user;
    this.apiService.addUser(this.user)
      .subscribe();
    this.show = false;
    setTimeout(() => this._route.navigateByUrl('dashboard'), 700);
  }

  cancel(): void {
    this.show = false;
    setTimeout(() => this.location.back(), 700);
    ;
  }

}
