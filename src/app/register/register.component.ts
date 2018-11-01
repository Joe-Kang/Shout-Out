import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
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
      // ...
      state('down', style({
        width: "300px",
        height: "300px",
        top: "55px",
        margin: "auto"
      })),
      state('up', style({
        width: "300px",
        height: '300px',
        top: "-275px",
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
export class RegisterComponent implements OnInit {

  constructor(
    private _route: Router,
    private location: Location
    ) { }

  show: boolean;

  ngOnInit() {
    this.show = false;
    setTimeout(() => this.show = true)
  }

  register(): void {

  }

  cancel(): void {
    this.show = false;
    setTimeout(() => this.location.back(), 700);
    ;
  }

}
