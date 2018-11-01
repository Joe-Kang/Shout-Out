import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
import { AutofillMonitor } from '@angular/cdk/text-field';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        width: "300px",
        height: "175px",
      })),
      state('closed', style({
        width: "300px",
        height: '175px',
        top: "-220px",
        margin: "auto"
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ],
})
export class LoginComponent implements OnInit {
  username;
  constructor(private _route: Router) { }

  ngOnInit() {
  }

  register(): void {
    this.toggle();
    setTimeout(function() {this._route.navigateByUrl('register');}, 500)

  }

  login(): void {

  }

  isOpen = true;

  toggle() {
    this.isOpen = !this.isOpen;
  }


}
