import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private _route: Router,
    private location: Location
    ) { }

  ngOnInit() {
  }

  register(): void {

  }

  cancel(): void {
    this.location.back();
  }

}
