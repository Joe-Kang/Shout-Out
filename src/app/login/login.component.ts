import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('upDown', [
      state('down', style({
        width: "300px",
        height: "175px",
        top: "55px",
        margin: "auto"
      })),
      state('up', style({
        width: "300px",
        height: '175px',
        top: "-220px",
        margin: "auto",
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
  username;
  constructor(private _route: Router) { }

  show: boolean;

  ngOnInit() {
    this.show = false;
    setTimeout(() => this.show = true)

  }

  register(): void {
    this.show = false;
    setTimeout(() => this._route.navigateByUrl('register'), 700);
  }

  login(): void {

  }
}
